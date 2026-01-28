
export const Layout = (content: string, activeTab: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>FunnelMgr Admin</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f2a20d",
                        "primary-dark": "#d98e0a",
                        "navy": "#0B1445",
                        "navy-light": "#152266",
                        "background-light": "#F5F6FA",
                        "background-dark": "#1a1a1a",
                        "card-light": "#ffffff",
                        "card-dark": "#2a2a2a",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                },
            },
        }
    </script>
    <style>
        body { font-family: 'Manrope', sans-serif; }
        .sidebar-link:hover { background-color: rgba(255, 255, 255, 0.1); }
        .sidebar-link.active { background-color: #f2a20d; color: white; }
        .sidebar-link.active .icon { color: white; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-72 bg-navy flex-shrink-0 flex flex-col justify-between h-screen fixed left-0 top-0 z-50 transition-all duration-300">
        <div class="flex flex-col h-full">
            <div class="p-6 pb-2">
                <div class="flex items-center gap-3 mb-8">
                    <div class="bg-white/10 rounded-xl p-2">
                        <span class="material-symbols-outlined text-primary text-3xl">filter_alt</span>
                    </div>
                    <div>
                        <h1 class="text-white text-lg font-bold leading-tight">FunnelMgr</h1>
                        <p class="text-slate-400 text-xs font-medium">E-com Dashboard</p>
                    </div>
                </div>
            </div>
            <nav class="flex-1 px-4 flex flex-col gap-2 overflow-y-auto">
                <a class="sidebar-link ${activeTab === 'dashboard' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/dashboard">
                    <span class="material-symbols-outlined icon ${activeTab === 'dashboard' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">dashboard</span>
                    <span class="text-sm font-medium">Overview</span>
                </a>
                <a class="sidebar-link ${activeTab === 'orders' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/orders">
                    <span class="material-symbols-outlined icon ${activeTab === 'orders' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">shopping_cart</span>
                    <span class="text-sm font-medium">Orders</span>
                </a>
                <a class="sidebar-link ${activeTab === 'inventory' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/inventory">
                    <span class="material-symbols-outlined icon ${activeTab === 'inventory' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">inventory_2</span>
                    <span class="text-sm font-medium">Inventory</span>
                </a>
                 <a class="sidebar-link ${activeTab === 'profile' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/profile">
                    <span class="material-symbols-outlined icon ${activeTab === 'profile' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">person</span>
                    <span class="text-sm font-medium">Profile</span>
                </a>
                 <a class="sidebar-link ${activeTab === 'editor' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/editor">
                    <span class="material-symbols-outlined icon ${activeTab === 'editor' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">edit_note</span>
                    <span class="text-sm font-medium">Editor</span>
                </a>
            </nav>
            <div class="p-4 border-t border-white/10">
                <a href="/admin/logout" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                    <span class="material-symbols-outlined text-slate-400">logout</span>
                    <span class="text-sm font-medium">Log Out</span>
                </a>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-72 flex-1 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark relative">
        ${content}
    </main>
</body>
</html>`;

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

export const OrdersView = (orders: any[]) => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
             <div>
                <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Orders</h1>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Manage your customer orders.</p>
            </div>
            <button class="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm">
                <span class="material-symbols-outlined text-[20px]">add</span> Create Order
            </button>
        </div>
    </header>
    <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-7xl mx-auto w-full">
            <div class="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                        <thead class="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                            ${orders.length > 0 ? orders.map(order => `
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap text-primary font-bold">#${order.id}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-semibold text-slate-900">${order.customer_name}</div>
                                        <div class="text-xs text-slate-500">${order.customer_phone}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">৳${order.total_price}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${order.status === 'confirmed' || order.status === 'delivered' ? 'bg-green-100 text-green-700' :
        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
    }">
                                            <span class="size-1.5 rounded-full ${order.status === 'confirmed' || order.status === 'delivered' ? 'bg-green-600' :
        order.status === 'cancelled' ? 'bg-red-600' :
            'bg-yellow-600'
    }"></span>
                                            ${order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${new Date(order.created_at).toLocaleDateString()}</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colSpan="5" class="px-6 py-12 text-center text-slate-500">No orders found.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`;

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

export const ProfileView = (user: any, success?: string, error?: string) => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full">
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Profile</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Update your admin credentials.</p>
        </div>
    </header>
    <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-2xl mx-auto w-full bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
            ${success ? `<div class="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">${success}</div>` : ''}
            ${error ? `<div class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">${error}</div>` : ''}
            
            <form method="POST" action="/admin/profile" class="space-y-6">
                <div>
                     <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                     <input type="text" name="username" value="${user?.username || ''}" class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary">
                </div>
                <div>
                     <label class="block text-sm font-medium text-slate-700 mb-1">New Password (leave blank to keep current)</label>
                     <input type="password" name="password" class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary">
                </div>
                 <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors">
                    Update Profile
                </button>
            </form>
        </div>
    </div>
`;

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
