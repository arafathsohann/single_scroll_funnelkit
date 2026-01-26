import { Context, Next } from 'hono'
import { sign, verify } from 'hono/jwt'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'

const JWT_SECRET = 'your-secret-key-change-in-prod'; // In prod use c.env.JWT_SECRET
const COOKIE_NAME = 'admin_session';

export const auth = {
    async login(c: Context) {
        try {
            const { username, password } = await c.req.json();

            if (!username || !password) {
                return c.json({ error: 'Username and password required' }, 400);
            }

            // Hash password
            const passwordHash = await hashPassword(password);

            // Check against DB
            let user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE username = ?').bind(username).first();

            console.log(`Login attempt for ${username}: ${user ? 'User Found' : 'User Not Found'}`);

            // Fallback: Auto-create admin if missing and using default creds
            if (!user && username === 'admin' && password === 'admin') {
                console.log('Auto-creating default admin user...');
                const adminHash = await hashPassword('admin');
                await c.env.DB.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').bind('admin', adminHash).run();
                user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE username = ?').bind('admin').first();
            }

            if (!user || user.password_hash !== passwordHash) {
                // Second check: if we just created it or if we are comparing hashes
                // Realistically we should re-fetch or compare correctly. 
                // If we just inserted, we know it's valid.
                // If we didn't insert, we need to compare.
                if (!user) return c.json({ error: 'Invalid credentials' }, 401);
                if (user.password_hash !== passwordHash) return c.json({ error: 'Invalid credentials' }, 401);
            }

            // Create JWT
            const payload = {
                sub: user.username,
                role: 'admin',
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
            }
            const token = await sign(payload, JWT_SECRET, 'HS256');

            // Set Cookie
            setCookie(c, COOKIE_NAME, token, {
                path: '/',
                secure: true,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'Strict',
            });

            return c.json({ success: true, redirect: '/admin/dashboard' });
        } catch (e: any) {
            console.error('Login Error:', e);
            return c.json({ error: e.message, stack: e.stack }, 500);
        }
    },

    async logout(c: Context) {
        deleteCookie(c, COOKIE_NAME);
        return c.redirect('/admin/login');
    },

    async middleware(c: Context, next: Next) {
        if (c.req.path === '/admin/login' || c.req.path === '/admin/api/login') {
            await next();
            return;
        }

        const token = getCookie(c, COOKIE_NAME);
        if (!token) {
            // Check if it's an API request or HTML request
            if (c.req.path.startsWith('/admin/api')) {
                return c.json({ error: 'Unauthorized' }, 401);
            }
            return c.redirect('/admin/login');
        }

        try {
            const payload = await verify(token, JWT_SECRET, 'HS256');
            c.set('user', payload);
            await next();
        } catch (e) {
            deleteCookie(c, COOKIE_NAME);
            if (c.req.path.startsWith('/admin/api')) {
                return c.json({ error: 'Unauthorized' }, 401);
            }
            return c.redirect('/admin/login');
        }
    }
}

async function hashPassword(password: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
