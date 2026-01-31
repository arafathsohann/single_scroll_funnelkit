
export const InventoryView = () => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Inventory</h1>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Manage stock levels and variants.</p>
            </div>
             <button class="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm">
                <span class="material-symbols-outlined text-[20px]">add</span> Add Variant
            </button>
        </div>
    </header>
    <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <!-- Sample Card 1 -->
            <div class="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col group">
                <div class="relative h-48 w-full bg-slate-100 flex items-center justify-center">
                   <span class="material-symbols-outlined text-4xl text-slate-300">checkroom</span>
                </div>
                <div class="p-5 flex flex-col gap-4 flex-1">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">Bottle Green</h3>
                         <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">In Stock</span>
                    </div>
                     <div class="grid grid-cols-2 gap-3">
                        <div>
                             <label class="block text-xs font-medium text-slate-500 mb-1">Price</label>
                             <div class="text-sm font-bold text-slate-900">$25.00</div>
                        </div>
                        <div>
                             <label class="block text-xs font-medium text-slate-500 mb-1">Stock</label>
                             <div class="text-sm font-bold text-slate-900">150</div>
                        </div>
                     </div>
                </div>
            </div>
             <!-- Sample Card 2 -->
             <div class="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col group">
                <div class="relative h-48 w-full bg-slate-100 flex items-center justify-center">
                   <span class="material-symbols-outlined text-4xl text-slate-300">checkroom</span>
                </div>
                <div class="p-5 flex flex-col gap-4 flex-1">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900">Navy Blue</h3>
                         <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">Low Stock</span>
                    </div>
                     <div class="grid grid-cols-2 gap-3">
                        <div>
                             <label class="block text-xs font-medium text-slate-500 mb-1">Price</label>
                             <div class="text-sm font-bold text-slate-900">$25.00</div>
                        </div>
                        <div>
                             <label class="block text-xs font-medium text-slate-500 mb-1">Stock</label>
                             <div class="text-sm font-bold text-slate-900">12</div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
`;
