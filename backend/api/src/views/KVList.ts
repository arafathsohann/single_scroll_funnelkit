
export const KVListView = (keys: { key: string; value: any }[]) => `
<div class="h-full flex flex-col bg-gray-50">
    <div class="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">KV Diagnostics</h1>
            <p class="text-slate-500 mt-1">Inspect all keys and values in Cloudflare KV.</p>
        </div>
        <div class="flex gap-3">
             <form method="POST" action="/admin/api/sync-t1" onsubmit="return confirm('This will overwrite the content of \'t1\' with the content from \'default\'. Are you sure?');">
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200">
                    <span class="material-symbols-outlined">sync_alt</span> Sync t1 from Default
                </button>
            </form>
            <form method="POST" action="/admin/api/seed" onsubmit="return confirm('This will overwrite any existing template-*:default keys (but NOT your pages). Continue?');">
                <button type="submit" class="text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors border border-slate-200 hover:border-slate-300">
                    <span class="material-symbols-outlined">dataset</span> Re-seed Defaults
                </button>
            </form>
        </div>
    </div>

    <div class="p-8 flex-1 overflow-y-auto">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="px-6 py-4 font-bold text-slate-700">Key</th>
                            <th class="px-6 py-4 font-bold text-slate-700">Value (Preview)</th>
                            <th class="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${keys.map(item => `
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="px-6 py-4 font-mono text-sm text-brand font-medium">
                                    <a href="/admin/kv/view/${item.key}" target="_blank" class="hover:underline flex items-center gap-1">
                                        ${item.key} <span class="material-symbols-outlined text-[10px] opacity-50">open_in_new</span>
                                    </a>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="/admin/kv/view/${item.key}" target="_blank" class="block group">
                                        <div class="max-w-xl truncate text-xs font-mono text-slate-500 bg-slate-100 group-hover:bg-slate-200 p-2 rounded border border-slate-200 transition-colors" title="Click to view full JSON">
                                            ${JSON.stringify(item.value).substring(0, 150)}${JSON.stringify(item.value).length > 150 ? '...' : ''}
                                        </div>
                                    </a>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="/admin/kv/view/${item.key}" target="_blank" class="text-xs text-indigo-600 font-bold hover:underline">View JSON</a>
                                </td>
                            </tr>
                        `).join('')}
                         ${keys.length === 0 ? `
                            <tr>
                                <td colspan="3" class="px-6 py-12 text-center text-slate-400">No keys found in KV.</td>
                            </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;
