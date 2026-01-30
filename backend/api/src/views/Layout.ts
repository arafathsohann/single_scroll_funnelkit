
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
                <a class="sidebar-link ${activeTab === 'pages' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/pages">
                    <span class="material-symbols-outlined icon ${activeTab === 'pages' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">web</span>
                    <span class="text-sm font-medium">Pages</span>
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
            <a class="sidebar-link ${activeTab === 'kv' ? 'active' : 'text-slate-300'} flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group" href="/admin/kv">
                    <span class="material-symbols-outlined icon ${activeTab === 'kv' ? 'text-white/70' : 'text-slate-400'} group-hover:text-white transition-colors">database</span>
                    <span class="text-sm font-medium">KV Data</span>
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
