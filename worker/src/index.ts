import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
    DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/api/page/:slug', async (c) => {
    const slug = c.req.param('slug')
    try {
        const page = await c.env.DB.prepare('SELECT * FROM pages WHERE slug = ?').bind(slug).first();

        if (!page) {
            return c.json({ error: 'Page not found', slug }, 404);
        }

        const elements = await c.env.DB.prepare('SELECT element_key, content, type FROM elements WHERE page_id = ?').bind(page.id).all();

        // Transform elements array into an object for easier frontend consumption
        const elementsMap: Record<string, string> = {};
        if (elements.results) {
            elements.results.forEach((el: any) => {
                elementsMap[el.element_key] = el.content;
            });
        }

        return c.json({
            page,
            elements: elementsMap
        })
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
    // In a real app, add authentication here!
    const orders = await c.env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    return c.json(orders.results);
})


export default app
