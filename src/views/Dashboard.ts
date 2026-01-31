
export const DashboardView = () => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full">
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Dashboard</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Welcome back, here's what's happening today.</p>
        </div>
    </header>
    <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-7xl mx-auto w-full flex flex-col gap-8">
            <!-- Analytics Cards -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40">
                    <div>
                        <p class="text-slate-500 text-sm font-medium mb-1">Total Sales</p>
                        <h3 class="text-2xl font-bold text-slate-900">$12,450</h3>
                    </div>
                </div>
                <div class="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-40">
                    <div>
                        <p class="text-slate-500 text-sm font-medium mb-1">Total Orders</p>
                        <h3 class="text-2xl font-bold text-slate-900">452</h3>
                    </div>
                </div>
            </section>
        </div>
    </div>
`;
