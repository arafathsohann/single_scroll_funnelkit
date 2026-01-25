import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import app from './index'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'
import { D1Adapter } from './db-adapter'

const db = new Database('orders.db')

// Initialize Schema
const schemaPath = path.join(__dirname, '../schema.sql');
if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
    console.log('Database schema initialized');
}

// Bind DB to app environment
const adapter = new D1Adapter(db);

const mainApp = new Hono()

mainApp.use('*', cors())

// Serve Landing Page
mainApp.get('/', (c) => {
    const htmlPath = path.resolve(__dirname, '../../glace_cotton_cargo_pants_funnel_landing_page_2.html');
    if (fs.existsSync(htmlPath)) {
        return c.html(fs.readFileSync(htmlPath, 'utf-8'));
    }
    return c.text('Landing page not found', 404);
})

// Mount the worker API
// We need to inject the DB binding.
// Since the imported `app` expects Bindings in context, we will use middleware to inject it.
mainApp.use('*', async (c, next) => {
    c.env = {
        DB: adapter
    } as any;
    await next();
})

mainApp.route('/', app)

console.log('Server running on http://localhost:3000')

serve({
    fetch: mainApp.fetch,
    port: 3000
})
