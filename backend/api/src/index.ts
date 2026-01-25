import { Hono } from 'hono'
import { cors } from 'hono/cors'
import content from '../content.json'

type Bindings = {
    DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
    origin: '*', // Allow all for dev simplicity
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}))

// Serve dynamic content for the landing page
app.get('/api/content', (c) => {
    return c.json(content)
})

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
