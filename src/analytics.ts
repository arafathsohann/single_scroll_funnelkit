
import { Hono } from 'hono'

type Bindings = {
    DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
    try {
        const db = c.env.DB;

        // Helper to run query and get single result
        const getStats = async (status: string | null) => {
            let query = 'SELECT COUNT(*) as count, SUM(total_price) as total_price FROM orders';
            const params = [];

            if (status) {
                query += ' WHERE status = ?';
                params.push(status);
            }

            const result: any = await db.prepare(query).bind(...params).first();
            return {
                count: result.count || 0,
                value: result.total_price || 0
            };
        };

        const [total, delivered, canceled, pending] = await Promise.all([
            getStats(null),
            getStats('delivered'),
            getStats('canceled'),
            getStats('pending')
        ]);

        // Also fetch recent orders for the summary table
        const recentOrders = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5').all();

        return c.json({
            total,
            delivered,
            canceled,
            pending,
            recentOrders: recentOrders.results
        });

    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
})

export { app as analyticsRouter }
