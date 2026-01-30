
export const PagesView = (pages: { slug: string; metadata?: any }[]) => `
<div class="h-full flex flex-col bg-gray-50">
    <div class="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Landing Pages</h1>
            <p class="text-slate-500 mt-1">Manage your funnel steps and landing pages.</p>
        </div>
         <button onclick="document.getElementById('create-modal').showModal()" class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/30">
            <span class="material-symbols-outlined">add</span> Create New Page
        </button>
    </div>

    <div class="p-8 flex-1 overflow-y-auto">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${pages.map(page => `
                <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-indigo-50 text-indigo-700 p-3 rounded-lg">
                             <span class="material-symbols-outlined text-3xl">web</span>
                        </div>
                        <span class="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">/${page.slug}</span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-800 mb-2 capitalize">${page.slug.replace('-', ' ')}</h3>
                    <p class="text-sm text-slate-500 mb-6">Template: Commerce V1</p>
                    
                    <div class="flex gap-2">
                         <a href="/admin/editor/${page.slug}" class="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                            <span class="material-symbols-outlined text-lg">edit_note</span> Edit
                        </a>
                        <a href="/p/${page.slug}" target="_blank" class="w-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-lg text-sm flex items-center justify-center transition-colors" title="View Live">
                            <span class="material-symbols-outlined text-lg">open_in_new</span>
                        </a>
                    </div>
                    <div class="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <form method="POST" action="/admin/api/pages/delete" onsubmit="return confirm('Are you sure you want to DELETE this page? This action cannot be undone.');">
                            <input type="hidden" name="slug" value="${page.slug}">
                            <button type="submit" class="text-xs text-slate-400 hover:text-red-600 font-bold flex items-center gap-1 transition-colors" title="Delete Page">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </form>

                        <form method="POST" action="/admin/api/pages/reset" onsubmit="return confirm('WARNING: This will completely wipe all changes on this page and restore the default template. This cannot be undone. Are you sure?');">
                            <input type="hidden" name="slug" value="${page.slug}">
                            <button type="submit" class="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                                <span class="material-symbols-outlined text-sm">restart_alt</span> Reset to Default
                            </button>
                        </form>
                    </div>
                </div>
            `).join('')}
             
             <!-- Empty State if no pages -->
             ${pages.length === 0 ? `
                <div class="col-span-full text-center py-20 text-slate-400">
                    <span class="material-symbols-outlined text-6xl mb-4">layers_clear</span>
                    <p>No pages found. Create one to get started.</p>
                </div>
             ` : ''}
        </div>
    </div>
</div>

<!-- Create Modal -->
<dialog id="create-modal" class="p-0 rounded-2xl shadow-2xl backdrop:bg-slate-900/50 open:animate-fade-in w-full max-w-md">
    <div class="bg-white p-6">
        <h3 class="text-xl font-bold mb-4">Create New Page</h3>
        <form method="POST" action="/admin/api/pages" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Page Slug</label>
                <input name="slug" type="text" placeholder="e.g. summer-sale, t2" class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" required pattern="[a-z0-9-]+" title="Lowercase letters, numbers, and hyphens only">
                <p class="text-xs text-slate-500 mt-1">This will be the URL path: /p/your-slug</p>
            </div>
             <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Template</label>
                <select name="template" class="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary">
                    <option value="commerce-v1">Commerce V1 (Default)</option>
                    <option value="commerce-v1" disabled>More coming soon...</option>
                </select>
            </div>
            <div class="flex justify-end gap-3 mt-6">
                <button type="button" onclick="document.getElementById('create-modal').close()" class="px-4 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-lg">Cancel</button>
                <button type="submit" class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold">Create Page</button>
            </div>
        </form>
    </div>
</dialog>
`;
