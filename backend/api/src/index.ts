import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ContentService, PageConfig } from './contentService'
import { render } from './renderer'
import { auth } from './auth'
import initialContent from '../content.json'
import { Layout, DashboardView, InventoryView, OrdersView, ProfileView, EditFunnelView, LoginView, EditorFrameView, PagesView, KVListView } from './dashboard'
// @ts-ignore
import clientJs from './client.js'

type Bindings = {
    DB: D1Database
    LANDING_PAGE_CONTENT: KVNamespace
}

type Variables = {
    user: any
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()

app.use('*', cors({
    origin: '*', // Allow all for dev simplicity
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}))

// Serve the Landing Page (SSR)
app.get('/', async (c) => {
    // Default to 't1' slug for the root path
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage('t1');

    if (!pageConfig) {
        return c.text('Landing page not found', 404);
    }

    // Pass the 'data' portion to the renderer
    const html = render(pageConfig.data);
    return c.html(html);
})

// Optional: Serve specific landing pages by slug
app.get('/p/:slug', async (c) => {
    const slug = c.req.param('slug');
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage(slug);

    if (!pageConfig) {
        return c.text('Page not found', 404);
    }

    const html = render(pageConfig.data);
    return c.html(html);
})

app.get('/client.js', (c) => {
    return c.body(clientJs, 200, {
        'Content-Type': 'text/javascript',
    })
})

// Serve dynamic content for editing
app.get('/api/content', async (c) => {
    // Default to 'default' slug for now, or allow query param?
    const slug = c.req.query('slug') || 't1';
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage(slug);

    return c.json(pageConfig ? pageConfig.data : {});
})

// Admin: Save content
app.post('/admin/api/content', auth.middleware, async (c) => {
    const body = await c.req.json();
    const slug = body.slug || 't1';
    const template = body.template || 'commerce-v1';

    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);

    // We expect the body to contain the new data in 'data' field, or maybe the body IS the data?
    // Let's assume the editor sends the 'data' object.
    // If the body has { slug, template, data }, use that. Otherwise wrap it.

    let newConfig: PageConfig;

    if (body.data && body.slug) {
        // Full config sent
        newConfig = body as PageConfig;
    } else {
        // Just data sent, wrap it for 'default'
        newConfig = {
            slug: slug,
            template: template,
            version: Date.now(), // Simple versioning
            data: body
        };
    }

    await contentService.savePage(newConfig);
    return c.json({ success: true, slug });
})

import { analyticsRouter } from './analytics'
app.route('/api/analytics', analyticsRouter)


// --- Admin Authentication & Routes ---

app.post('/admin/api/login', auth.login);
app.get('/admin/logout', auth.logout);

// Protect all /admin routes (except login)
app.use('/admin/*', auth.middleware);

app.get('/admin/login', (c) => {
    // Return HTML for login page
    // If already logged in, redirect? auth.middleware usually handles protection, not guest-only.
    // But for specific login page, if user is already authenticated, we might want to redirect to dashboard.
    // For now, simplest is just serve the page.
    return c.html(LoginView());
})

app.get('/admin', (c) => c.redirect('/admin/dashboard'))

app.get('/admin/dashboard', (c) => {
    return c.html(Layout(DashboardView(), 'dashboard'));
})

app.get('/admin/inventory', (c) => {
    return c.html(Layout(InventoryView(), 'inventory'));
})

app.get('/admin/pages', async (c) => {
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pages = await contentService.listPages();
    return c.html(Layout(PagesView(pages), 'pages'));
})

app.post('/admin/api/pages', async (c) => {
    const body = await c.req.parseBody();
    const slug = body.slug as string;
    const template = body.template as string || 'commerce-v1';

    if (!slug) return c.text('Slug required', 400);

    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    // Use initialContent as seed
    await contentService.createPage(slug, initialContent, template);

    return c.redirect('/admin/pages');
})

app.post('/admin/api/pages/reset', async (c) => {
    const body = await c.req.parseBody();
    const slug = body.slug as string;

    if (!slug) return c.text('Slug required', 400);

    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    // Reset to initialContent
    await contentService.createPage(slug, initialContent, 'commerce-v1');

    return c.redirect('/admin/pages');
})


app.post('/admin/api/pages/delete', async (c) => {
    const body = await c.req.parseBody();
    const slug = body.slug as string;

    if (!slug) return c.text('Slug required', 400);

    // Delete both page and draft
    await c.env.LANDING_PAGE_CONTENT.delete(`page:${slug}`);
    await c.env.LANDING_PAGE_CONTENT.delete(`draft:${slug}`);

    return c.redirect('/admin/pages');
})

// --- KV Diagnostics Routes ---

app.get('/admin/kv', async (c) => {
    const list = await c.env.LANDING_PAGE_CONTENT.list();
    const keys = [];

    for (const key of list.keys) {
        let value = null;
        try {
            value = await c.env.LANDING_PAGE_CONTENT.get(key.name, 'json');
        } catch (e) {
            value = await c.env.LANDING_PAGE_CONTENT.get(key.name, 'text');
        }
        keys.push({ key: key.name, value });
    }

    return c.html(Layout(KVListView(keys), 'kv'));
})

app.get('/admin/kv/view/:key', async (c) => {
    const key = c.req.param('key');
    const value = await c.env.LANDING_PAGE_CONTENT.get(key, 'text');

    try {
        const json = JSON.parse(value || '{}');
        return c.json(json);
    } catch {
        return c.text(value || '');
    }
})

// --- Sync Routes ---

app.post('/admin/api/sync-t1', async (c) => {
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);

    // 1. Get default page data (from implicit 'default' page or just creating one if missing logic?)
    // User expects /p/default to have data. That means 'page:default' likely exists.
    const sourceConfig = await contentService.getPage('default');

    if (!sourceConfig) {
        return c.text('Source page "default" not found in KV.', 404);
    }

    // 2. Overwrite 't1' with this data
    const targetSlug = 't1';
    const newConfig: PageConfig = {
        slug: targetSlug,
        template: sourceConfig.template || 'commerce-v1',
        version: Date.now(),
        data: sourceConfig.data
    };

    await contentService.savePage(newConfig);
    await contentService.saveDraft(newConfig);

    return c.redirect('/admin/kv');
})

app.get('/admin/orders', async (c) => {
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
        return c.html(Layout(OrdersView(results), 'orders'));
    } catch (e: any) {
        return c.html(Layout(`<h1>Error loading orders</h1><p>${e.message}</p>`, 'orders'));
    }
});

app.get('/admin/profile', (c) => {
    const user = c.get('user');
    return c.html(Layout(ProfileView(user), 'profile'));
});

app.post('/admin/profile', async (c) => {
    const user = c.get('user');
    const body = await c.req.parseBody();
    const { username, password } = body;

    try {
        let updateQuery = 'UPDATE admin_users SET username = ?';
        let params: any[] = [username];

        if (password && typeof password === 'string' && password.length > 0) {
            const msgBuffer = new TextEncoder().encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            updateQuery += ', password_hash = ?';
            params.push(hashHex);
        }

        updateQuery += ' WHERE username = ?';
        params.push(user.sub);

        await c.env.DB.prepare(updateQuery).bind(...params).run();

        return c.html(Layout(ProfileView({ username }, 'Profile updated successfully!'), 'profile'));
    } catch (e: any) {
        return c.html(Layout(ProfileView({ username }, undefined, e.message), 'profile'));
    }
});

// --- Editor Assets ---
// @ts-ignore
import editorJs from './editor.js'
// @ts-ignore
import editorCss from './editor.css'

app.get('/editor.js', (c) => c.body(editorJs, 200, { 'Content-Type': 'text/javascript' }))
app.get('/editor.css', (c) => c.body(editorCss, 200, { 'Content-Type': 'text/css' }))

// --- Editor Page (Frame with Sidebar) ---
app.get('/admin/editor/:slug?', async (c) => {
    const slug = c.req.param('slug') || c.req.query('slug') || 't1';
    // This view just renders the Sidebar Layout + the Iframe pointing to the canvas
    return c.html(Layout(EditorFrameView(slug), 'editor')); // 'editor' active tab
});

// --- Editor Canvas (The Actual Editable Page inside Iframe) ---
app.get('/admin/editor-canvas/:slug?', async (c) => {
    const slug = c.req.param('slug') || 't1';
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);

    // Load DRAFT content to render
    const draftConfig = await contentService.getDraft(slug);

    // Fallback if no draft/page exists: Use initialContent from file to SEED the editor
    const data = draftConfig ? draftConfig.data : initialContent;

    const pageHtml = render(data);

    // Inject Editor Scripts & State
    // We append them to body
    const editorScripts = `
        <link rel="stylesheet" href="/editor.css">
        <script>
            window.__PAGE_SLUG__ = "${slug}";
            window.__EDITOR_STATE__ = ${JSON.stringify(data)};
        </script>
        <script src="/editor.js"></script>
    `;

    const fullHtml = pageHtml.replace('</body>', `${editorScripts}</body>`);
    return c.html(fullHtml);
});

// --- Editor API ---

app.post('/admin/api/draft', auth.middleware, async (c) => {
    const body = await c.req.json();
    const { slug, data } = body;

    if (!slug || !data) return c.json({ error: 'Missing slug or data' }, 400);

    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);

    // We should probably get the existing config to preserve template/meta if possible
    // For now, simple update or create
    const existing = await contentService.getDraft(slug); // or getPage if draft missing

    const newConfig: PageConfig = {
        slug,
        template: existing?.template || 'commerce-v1',
        version: (existing?.version || 0) + 1,
        data: data
    };

    await contentService.saveDraft(newConfig);
    return c.json({ success: true });
});

app.post('/admin/api/publish', auth.middleware, async (c) => {
    const body = await c.req.json();
    const { slug, data } = body;

    if (!slug) return c.json({ error: 'Missing slug' }, 400);

    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    try {
        // If data is provided, save it as a draft first (or update page directly?)
        // Let's save as draft to maintain history/consistency, then publish.
        if (data) {
            const existing = await contentService.getDraft(slug);
            const newConfig: PageConfig = {
                slug,
                template: existing?.template || 'commerce-v1',
                version: (existing?.version || 0) + 1,
                data: data
            };
            await contentService.saveDraft(newConfig);
        }

        await contentService.publishDraft(slug);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// TEMPORARY: Reset t1 to content.json
app.get('/admin/api/reset-t1', auth.middleware, async (c) => {
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    await contentService.createPage('t1', initialContent, 'commerce-v1');
    return c.text('Reset t1 to initial content');
});


// --- End Admin Routes ---

// Serve dynamic content for editing (if needed in future)

app.get('/api/page/:slug', async (c) => {
    // Keep existing logic if needed, or deprecate
    const slug = c.req.param('slug')
    try {
        const page = await c.env.DB.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first();
        if (!page) return c.json({ error: 'Page not found', slug }, 404);
        return c.json({ page })
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
})

app.post('/api/order', async (c) => {
    try {
        const body = await c.req.json();
        const { customer_name, customer_address, customer_phone, product_summary, total_price } = body;

        // Basic Validation
        if (!customer_name || !customer_phone) {
            return c.json({ error: 'Name and Phone are required' }, 400);
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO orders (customer_name, customer_address, customer_phone, product_summary, total_price) 
       VALUES (?, ?, ?, ?, ?)`
        ).bind(customer_name, customer_address, customer_phone, product_summary, total_price).run();

        return c.json({ success: true, orderId: result.meta.last_row_id });
    } catch (e: any) {
        console.error(e);
        return c.json({ success: false, error: e.message }, 500);
    }
})

app.get('/api/orders', async (c) => {
    try {
        const orders = await c.env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
        return c.json(orders.results);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
})

export default app
