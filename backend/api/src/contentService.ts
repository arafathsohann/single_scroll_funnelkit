import { KVNamespace } from '@cloudflare/workers-types'

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
     * Get the *Draft* version of a page.
     * If no draft exists, falls back to the published page (or default fallback).
     */
    async getDraft(slug: string): Promise<PageConfig | null> {
        const key = `draft:${slug}`;

        // Try fetching draft from KV
        try {
            const stored = await this.kv.get(key, 'json');
            if (stored) {
                return stored as PageConfig;
            }
        } catch (e) { /* ignore */ }

        // Fallback to published page
        return this.getPage(slug);
    }

    /**
     * Save a Draft version.
     */
    async saveDraft(page: PageConfig): Promise<void> {
        if (!page.slug) throw new Error('Page slug is required');
        const key = `draft:${page.slug}`;
        await this.kv.put(key, JSON.stringify(page));
    }

    /**
     * Publish a draft: Copy draft content to published page key.
     */
    async publishDraft(slug: string): Promise<void> {
        const draftKey = `draft:${slug}`;
        const draft = await this.kv.get(draftKey, 'json') as PageConfig | null;

        if (!draft) {
            throw new Error('No draft found to publish');
        }

        // Save as published page
        await this.savePage(draft);

        // Optional: Delete draft after publish? Or keep it? keeping it is safer/easier.
    }

    /**
     * Helper to list all pages (optional, for admin dashboard)
     */
    async listPages(): Promise<{ name: string; metadata?: any }[]> {
        const list = await this.kv.list({ prefix: 'page:' });
        return list.keys;
    }
}
