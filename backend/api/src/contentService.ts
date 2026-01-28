import { KVNamespace } from '@cloudflare/workers-types'
import defaultContent from '../content.json'

// Define the structure for a stored page
export interface PageConfig {
    slug: string;
    template: string; // e.g., 'commerce-v1'
    version: number;
    data: any; // The content object used by the renderer
}

export class ContentService {
    private kv: KVNamespace;

    constructor(kv: KVNamespace) {
        this.kv = kv;
    }

    /**
     * Retrieve a page configuration by slug.
     * Falls back to content.json for 'default' slug if KV is empty.
     */
    async getPage(slug: string): Promise<PageConfig | null> {
        const key = `page:${slug}`;

        try {
            // Try fetching from KV
            const stored = await this.kv.get(key, 'json');
            if (stored) {
                return stored as PageConfig;
            }
        } catch (e) {
            console.error(`Error fetching key ${key} from KV:`, e);
        }

        // Fallback for default page if not found in KV
        if (slug === 'default' || slug === 'home') {
            console.log('Serving fallback content from content.json');
            return {
                slug: 'default',
                template: 'commerce-v1',
                version: 1,
                data: defaultContent
            };
        }

        return null; // Page not found
    }

    /**
     * Save or update a page configuration.
     */
    async savePage(page: PageConfig): Promise<void> {
        if (!page.slug) throw new Error('Page slug is required');

        const key = `page:${page.slug}`;
        await this.kv.put(key, JSON.stringify(page));
    }

    /**
     * Helper to list all pages (optional, for admin dashboard)
     */
    async listPages(): Promise<{ name: string; metadata?: any }[]> {
        const list = await this.kv.list({ prefix: 'page:' });
        return list.keys;
    }
}
