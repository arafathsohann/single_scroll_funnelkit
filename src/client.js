
// Inject SSR Data (Consumed by other scripts)
// window.siteContent is already set in the HTML head/body by renderer before this script runs

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const data = window.siteContent;
        if (data) {
            initializeOrderForm(data);
        }
    });

    function initializeOrderForm(data) {
        // Generate Products
        const productContainer = document.getElementById('product-list-container');
        if (productContainer && data.orderForm.products) {
            productContainer.innerHTML = data.orderForm.products.map((prod, index) => `
                <label class="block cursor-pointer group">
                    <input class="hidden peer" name="product" type="radio" value="${prod.id}" data-price="${prod.price}" ${index === 0 ? 'checked' : ''} />
                    <div class="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 peer-checked:border-brand peer-checked:bg-blue-50 transition-all">
                        <img alt="${prod.name}" class="w-16 h-16 rounded-lg object-cover" src="${prod.image}" />
                        <div class="flex-1">
                            <h4 class="font-bold">${prod.name} × <span class="quantity-display">১</span></h4>
                            <p class="text-sm text-slate-500">${prod.price}৳</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" class="qty-btn w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-xl font-bold hover:bg-slate-300" data-action="decrease">-</button>
                            <span class="font-bold px-2 quantity-value">1</span>
                            <button type="button" class="qty-btn w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-xl font-bold hover:bg-slate-300" data-action="increase">+</button>
                        </div>
                    </div>
                </label>
            `).join('');
        }

        // Generate Shipping Options
        const shippingContainer = document.getElementById('shipping-options-container');
        if (shippingContainer && data.orderForm.shippingOptions) {
            shippingContainer.innerHTML = data.orderForm.shippingOptions.map((opt, index) => `
                <label class="flex items-center justify-between cursor-pointer ${index > 0 ? 'border-t border-slate-100 pt-3' : ''}">
                    <div class="flex items-center gap-2">
                        <input class="text-brand focus:ring-brand" name="shipping" type="radio" value="${opt.price}" ${index === 0 ? 'checked' : ''} />
                        <span>${opt.label}</span>
                    </div>
                    <span class="font-bold">${opt.price}৳</span>
                </label>
            `).join('');
        }

        // Initialize Total Calculation Logic
        updateTotal();

        // Event Listeners for Dynamic Elements
        document.getElementById('order-form').addEventListener('change', (e) => {
            if (e.target.name === 'product' || e.target.name === 'shipping') {
                updateTotal();
            }
        });

        // --- QUANTITY EVENT DELEGATION ---
        if (productContainer) {
            productContainer.addEventListener('click', (e) => {
                // Check if clicked element is a quantity button
                if (e.target.classList.contains('qty-btn')) {
                    e.preventDefault(); // Prevent radio selection when clicking buttons

                    const action = e.target.dataset.action;
                    const wrapper = e.target.closest('.flex.items-center.gap-2'); // Container of buttons
                    const qtyDisplay = wrapper.querySelector('.quantity-value');
                    const mainDisplay = e.target.closest('.flex.items-center').querySelector('.quantity-display'); // The display in the title

                    let currentQty = parseInt(qtyDisplay.innerText);

                    if (action === 'increase') {
                        currentQty++;
                    } else if (action === 'decrease' && currentQty > 1) {
                        currentQty--;
                    }

                    // Update UI
                    qtyDisplay.innerText = currentQty;

                    // Also update the title display ("x 1") if desired
                    if (mainDisplay) mainDisplay.innerText = currentQty;

                    // Update Total Price logic could go here if price depends on quantity
                    updateTotal();
                }
            });
        }
    }

    function updateTotal() {
        const product = document.querySelector('input[name="product"]:checked');
        const shipping = document.querySelector('input[name="shipping"]:checked');
        const data = window.siteContent;

        if (product && shipping) {
            // Price Calculation
            const price = parseInt(product.dataset.price || 0);
            const shipPrice = parseInt(shipping.value || 0);

            // Quantity
            const wrapper = product.closest('label');
            const qtyElement = wrapper.querySelector('.quantity-value');
            const qty = qtyElement ? parseInt(qtyElement.innerText) : 1;
            const subtotal = price * qty;
            const total = subtotal + shipPrice;

            // --- Update Summary Section ---
            const summaryContainer = document.querySelector('.space-y-4.mb-6');
            if (summaryContainer) {
                // Find Product Info
                const prodId = product.value;
                const fullProduct = data.orderForm.products.find(p => p.id === prodId) || {};
                const prodName = fullProduct.name || 'Product';
                const prodImage = fullProduct.image || '';

                summaryContainer.innerHTML = `
                    <div class="flex items-start gap-4 pb-4 border-b border-slate-100">
                        <img alt="${prodName}" class="w-12 h-12 rounded object-cover" src="${prodImage}" />
                        <div class="flex-1">
                            <p class="text-sm font-medium">${prodName}</p>
                        </div>
                        <span class="font-bold">× ${toBanglaNum(qty)} ${subtotal}৳</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-slate-500">Subtotal</span>
                        <span class="font-bold">${subtotal}৳</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-slate-500">Shipping</span>
                        <span class="font-bold">${shipPrice}৳</span>
                    </div>
                    <div class="flex justify-between text-lg font-bold border-t border-slate-100 pt-4">
                        <span>Total</span>
                        <span class="text-brand">${total}৳</span>
                    </div>
                `;
            }

            // Update Button
            const btn = document.getElementById('order-btn');
            if (btn) {
                btn.innerHTML = `<span class="material-icons">lock</span> <span id="order-btn-text">${data.orderForm?.summary?.buttonText || 'অর্ডার করুন'}</span> ${total}৳`;
            }
        }
    }

    function toBanglaNum(n) {
        return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    }

    document.getElementById('order-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        const btn = e.target.closest('button');
        const originalText = btn.innerHTML;

        // Gather Data
        const name = document.getElementById('customer_name').value;
        const address = document.getElementById('customer_address').value;
        const phone = document.getElementById('customer_phone').value;

        // Get selected product
        const product = document.querySelector('input[name="product"]:checked');
        const productText = product ? product.closest('label').querySelector('h4').innerText : 'Unknown Product';
        const productPrice = product ? parseInt(product.dataset.price) : 0;

        // Get selected size
        const sizeInput = document.querySelector('input[name="size"]:checked');
        const size = sizeInput ? sizeInput.closest('label').innerText.trim().split(' ')[0] : 'N/A';

        // Get selected colors
        const colors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
            .map(cb => cb.value).join(', ');

        // Get shipping
        const shippingInput = document.querySelector('input[name="shipping"]:checked');
        const shippingCost = shippingInput ? parseInt(shippingInput.value) : 0;

        // Get Quantity
        const wrapper = product ? product.closest('label') : null;
        const qtyElement = wrapper ? wrapper.querySelector('.quantity-value') : null;
        const qty = qtyElement ? parseInt(qtyElement.innerText) : 1;

        // Validation
        if (!name || !address || !phone) {
            alert('অনুগ্রহ করে নাম, ঠিকানা এবং মোবাইল নম্বর পূরণ করুন।');
            return;
        }

        const productSummary = `${productText} (Qty: ${qty}) - Size: ${size} - Color: ${colors}`;

        const total = (productPrice * qty) + shippingCost;

        btn.disabled = true;
        btn.innerText = 'অর্ডার প্রসেসিং হচ্ছে...';

        try {
            // Use relative URL for client
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_name: name,
                    customer_address: address,
                    customer_phone: phone,
                    product_summary: productSummary,
                    total_price: total
                })
            });

            const result = await response.json();

            if (result.success) {
                // Success UI
                document.querySelector('main').innerHTML = `
                    <div class="text-center py-20">
                        <span class="material-icons text-6xl text-green-500 mb-4">check_circle</span>
                        <h2 class="text-3xl font-bold mb-4">অর্ডার সফল হয়েছে!</h2>
                        <p class="text-xl">আপনার অর্ডার আইডি: #${result.orderId}</p>
                        <p class="mt-4">আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
                    </div>
                `;
                document.getElementById('order-form').scrollIntoView();
            } else {
                alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        } catch (err) {
            console.error(err);
            alert('নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });

}
