
export const OrdersView = (orders: any[]) => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
             <div>
                <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Orders</h1>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Manage your customer orders.</p>
            </div>
            <!--
            <button class="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm">
                <span class="material-symbols-outlined text-[20px]">add</span> Create Order
            </button>
            -->
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
                                <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
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
                                    <td class="px-6 py-4 whitespace-nowrap text-right">
                                        <button onclick="openOrderModal(${order.id})" class="text-brand hover:text-brand-dark font-medium text-sm flex items-center justify-end gap-1">
                                            <span class="material-symbols-outlined text-sm">visibility</span> Details
                                        </button>
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colSpan="6" class="px-6 py-12 text-center text-slate-500">No orders found.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Details Modal -->
    <dialog id="order-modal" class="rounded-2xl shadow-2xl backdrop:bg-slate-900/50 w-full max-w-2xl p-0 open:animate-fade-in relative">
        <div class="bg-white flex flex-col max-h-[90vh]">
            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h3 class="text-lg font-bold text-slate-800">Order Details <span id="modal-order-id" class="text-brand ml-2"></span></h3>
                    <p id="modal-order-date" class="text-xs text-slate-500 mt-1"></p>
                </div>
                <button onclick="document.getElementById('order-modal').close()" class="text-slate-400 hover:text-slate-600 transition-colors">
                    <span class="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>
            
            <div class="p-6 overflow-y-auto space-y-6">
                <!-- Customer Info -->
                <div class="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer</h4>
                        <p id="modal-customer-name" class="font-bold text-slate-900"></p>
                        <p id="modal-customer-phone" class="text-sm text-slate-600 mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">phone</span> <span class="content"></span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Address</h4>
                        <p id="modal-customer-address" class="text-sm text-slate-700 leading-relaxed"></p>
                    </div>
                </div>

                <!-- Order Items -->
                <div>
                    <h4 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-brand">shopping_bag</span> Order Items
                    </h4>
                    <div id="modal-order-items" class="space-y-3">
                        <!-- Dynamic Items -->
                    </div>
                </div>

                <!-- Summary -->
                <div class="border-t border-slate-100 pt-4 flex flex-col items-end gap-2">
                     <div class="flex justify-between w-full max-w-xs text-sm">
                        <span class="text-slate-500">Total Amount</span>
                        <span id="modal-total-price" class="font-bold text-xl text-brand"></span>
                    </div>
                </div>
            </div>
            
            <div class="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button onclick="document.getElementById('order-modal').close()" class="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">Close</button>
                <button class="px-4 py-2 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20">Print Invoice</button>
            </div>
        </div>
    </dialog>

    <script>
        // Inject Orders Data securely
        window.ORDERS_DATA = ${JSON.stringify(orders).replace(/</g, '\\u003c')};

        function openOrderModal(orderId) {
            const order = window.ORDERS_DATA.find(o => o.id === orderId);
            if (!order) return;

            // Populate Fields
            document.getElementById('modal-order-id').textContent = '#' + order.id;
            document.getElementById('modal-order-date').textContent = new Date(order.created_at).toLocaleString();
            document.getElementById('modal-customer-name').textContent = order.customer_name;
            document.getElementById('modal-customer-phone').querySelector('.content').textContent = order.customer_phone;
            document.getElementById('modal-customer-address').textContent = order.customer_address || 'No address provided';
            document.getElementById('modal-total-price').textContent = '৳' + order.total_price;

            // Parse Product Summary
            const itemsContainer = document.getElementById('modal-order-items');
            itemsContainer.innerHTML = '';
            
            try {
                // Ensure double parsing if stored as double stringified, or just once
                let products = order.product_summary;
                if (typeof products === 'string') {
                    try { products = JSON.parse(products); } catch(e) {}
                }
                
                // If it's not an array, maybe it's a single object or string?
                // The client.js sends it as JSON string.
                
                if (Array.isArray(products)) {
                   products.forEach(item => {
                       // item structure from client.js: { id, name, price, quantity, size, color }
                       // Note: client.js currently sends just 'product_summary' as text? 
                       // Wait, let's check client.js implementation.
                       // It sends: JSON.stringify(cart) where cart is array of items.
                       
                       const el = document.createElement('div');
                       el.className = 'flex items-start gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100';
                       el.innerHTML = \`
                           <div class="flex-1">
                               <p class="font-bold text-slate-800">\${item.name || 'Product'} <span class="text-xs text-slate-500 ml-1">(\${item.id})</span></p>
                               <div class="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                                   \${item.size ? \`<span class="bg-white px-2 py-0.5 rounded border border-slate-200">Size: \${item.size}</span>\` : ''}
                                   \${item.color ? \`<span class="bg-white px-2 py-0.5 rounded border border-slate-200">Color: \${item.color}</span>\` : ''}
                               </div>
                           </div>
                           <div class="text-right">
                               <p class="font-bold text-slate-900">\${item.price}৳</p>
                               <p class="text-xs text-slate-500">Qty: \${item.quantity || 1}</p>
                           </div>
                       \`;
                       itemsContainer.appendChild(el);
                   });
                } else {
                    itemsContainer.innerHTML = '<p class="text-sm text-slate-500">Invalid product data format.</p>';
                    // Debug
                    const pre = document.createElement('pre');
                    pre.className = 'text-xs text-slate-400 mt-2 overflow-x-auto';
                    pre.textContent = JSON.stringify(products, null, 2);
                    itemsContainer.appendChild(pre);
                }

            } catch (e) {
                console.error(e);
                itemsContainer.innerHTML = '<p class="text-red-500 text-sm">Error parsing order items.</p>';
            }

            document.getElementById('order-modal').showModal();
        }
    </script>
`;
