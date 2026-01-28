
export const EditFunnelView = (currentHtml: string) => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full">
             <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Funnel Editor</h1>
             <p class="text-slate-500 dark:text-slate-400 text-sm">Edit your landing page content.</p>
        </div>
    </header>
     <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-7xl mx-auto w-full h-[600px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <iframe src="/" class="w-full h-full"></iframe>
        </div>
     </div>
`;
