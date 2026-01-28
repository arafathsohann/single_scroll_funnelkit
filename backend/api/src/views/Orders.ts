
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
