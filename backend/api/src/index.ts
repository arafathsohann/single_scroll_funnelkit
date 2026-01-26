import { Hono } from 'hono'
import { cors } from 'hono/cors'
import content from '../content.json'
import { render } from './renderer'
import { auth } from './auth'
import { Layout, DashboardView, InventoryView, OrdersView, ProfileView, EditFunnelView } from './ui'
// @ts-ignore
import clientJs from './client.js'

type Bindings = {
    DB: D1Database
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
app.get('/', (c) => {
    const html = render(content);
    return c.html(html);
})

app.get('/client.js', (c) => {
    return c.body(clientJs, 200, {
        'Content-Type': 'text/javascript',
    })
})

// Serve dynamic content for editing (if needed in future)
app.get('/api/content', (c) => {
    return c.json(content)
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
    return c.html(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin Login</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Inter', sans-serif; }
            </style>
        </head>
        <body class="bg-gray-50 flex items-center justify-center h-screen">
            <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold text-gray-900">Sign In</h1>
                    <p class="text-gray-500 text-sm mt-2">Enter your credentials to access the admin panel.</p>
                </div>
                <form id="loginForm" class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="username" name="username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="admin" required>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" name="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" required>
                    </div>
                    <div id="error" class="hidden text-red-500 text-sm text-center bg-red-50 p-2 rounded"></div>
                    <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                        Sign In
                    </button>
                </form>
            </div>
            <script>
                document.getElementById('loginForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    const errorDiv = document.getElementById('error');
                    
                    try {
                        const res = await fetch('/admin/api/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username, password })
                        });
                        const data = await res.json();
                        
                        if (data.success) {
                            window.location.href = data.redirect || '/admin/dashboard';
                        } else {
                            errorDiv.textContent = data.error || 'Login failed';
                            errorDiv.classList.remove('hidden');
                        }
                    } catch (err) {
                        errorDiv.textContent = 'An error occurred. Please try again.';
                        errorDiv.classList.remove('hidden');
                    }
                });
            </script>
        </body>
        </html>
    `);
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

app.get('/admin/editor', (c) => {
    const html = render(content);
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
