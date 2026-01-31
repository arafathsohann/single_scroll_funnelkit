
export const EditorFrameView = (slug: string) => `
<div class="flex flex-col h-full bg-gray-100">
    <!-- Toolbar / Header for Editor Context -->
    <div class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
            <h1 class="text-xl font-bold text-slate-800">Visual Editor</h1>
            <p class="text-sm text-slate-500">Editing Page: <span class="font-mono text-brand bg-brand/10 px-2 py-0.5 rounded">${slug}</span></p>
        </div>
        <div class="flex gap-3">
             <a href="/p/${slug}" target="_blank" class="flex items-center gap-2 text-slate-600 hover:text-brand transition-colors text-sm font-medium">
                <span class="material-symbols-outlined text-lg">open_in_new</span> View Live
            </a>
        </div>
    </div>
    
    <!-- Editor Canvas (Iframe) -->
    <div class="flex-1 overflow-hidden relative">
        <iframe 
            src="/admin/editor-canvas/${slug}" 
            class="w-full h-full border-none"
            title="Editor Canvas"
        ></iframe>
    </div>
</div>
`;
