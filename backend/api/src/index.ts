import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ContentService, PageConfig } from './contentService'
import { render } from './renderer'
import { auth } from './auth'
import { Layout, DashboardView, InventoryView, OrdersView, ProfileView, EditFunnelView, LoginView } from './dashboard'
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
    // Default to 'default' slug for the root path
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage('default');

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
    const slug = c.req.query('slug') || 'default';
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage(slug);

    return c.json(pageConfig ? pageConfig.data : {});
})

// Admin: Save content
app.post('/admin/api/content', auth.middleware, async (c) => {
    const body = await c.req.json();
    const slug = body.slug || 'default';
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

app.get('/admin/editor', async (c) => {
    const contentService = new ContentService(c.env.LANDING_PAGE_CONTENT);
    const pageConfig = await contentService.getPage('default');
    const html = render(pageConfig ? pageConfig.data : {});
    return c.html(Layout(EditFunnelView(html), 'editor'));
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
