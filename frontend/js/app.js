document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Content Fetching
    fetchContent();

    const orderBtn = document.getElementById('order-btn');
    const nameInput = document.getElementById('customer_name');
    const addressInput = document.getElementById('customer_address');
    const phoneInput = document.getElementById('customer_phone');

    // Price constants (User provided structure)
    const PRODUCTS = {
        'single': { name: 'প্রিমিয়াম কার্গো প্যান্ট', price: 440 },
        'combo2': { name: 'প্রিমিয়াম কার্গো প্যান্ট কম্বো (২-প্যাক)', price: 1300 },
        'combo3': { name: 'প্রিমিয়াম কার্গো প্যান্ট কম্বো (৩-প্যাক)', price: 1800 }
    };

    if (orderBtn) {
        orderBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const originalText = orderBtn.innerHTML;

            // Gather Data
            const name = nameInput.value;
            const address = addressInput.value;
            const phone = phoneInput.value;

            // Get selected product from DOM (Contextual adaptation)
            const productRadio = document.querySelector('input[name="product"]:checked');
            // Logic to determine product key or name based on selection
            // For now, grabbing text as per original robust script
            const productText = productRadio ? productRadio.closest('label').querySelector('h4').innerText : 'Unknown Product';

            // Get selected size
            const sizeInput = document.querySelector('input[name="size"]:checked');
            const size = sizeInput ? sizeInput.closest('label').innerText.trim().split(' ')[0] : 'N/A';

            // Get selected colors
            const colors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
                .map(cb => cb.value).join(', ');

            // Validation
            if (!name || !address || !phone) {
                alert('অনুগ্রহ করে নাম, ঠিকানা এবং মোবাইল নম্বর পূরণ করুন।');
                return;
            }

            const productSummary = `${productText} - Size: ${size} - Color: ${colors}`;

            // Dynamic Price Calculation could go here based on PRODUCTS
            // For now, utilizing the static total or simple logic
            const total = 510; // Placeholder as per previous script

            orderBtn.disabled = true;
            orderBtn.innerText = 'Creating Order...';

            try {
                const response = await fetch('http://localhost:8787/api/order', {
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
                    // Success UI - Premium Feel (Contextual)
                    document.querySelector('main').innerHTML = `
                        <div class="text-center py-20">
                            <span class="material-icons text-6xl text-green-500 mb-4">check_circle</span>
                            <h2 class="text-3xl font-bold mb-4">অর্ডার সফল হয়েছে!</h2>
                            <p class="text-xl">আপনার অর্ডার আইডি: #${result.orderId}</p>
                            <p class="mt-4">আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
                        </div>
                    `;
                    document.getElementById('order-form').scrollIntoView();

                    // Optional: Reset form if we weren't replacing main
                    // nameInput.value = ''; addressInput.value = ''; phoneInput.value = '';
                } else {
                    alert('Error: ' + (result.error || 'Order failed'));
                    orderBtn.disabled = false;
                    orderBtn.innerHTML = originalText;
                }
            } catch (err) {
                console.error(err);
                alert('Network Error. Please try again.');
                orderBtn.disabled = false;
                orderBtn.innerHTML = originalText;
            }
        });
    }
});

async function fetchContent() {
    try {
        const res = await fetch('http://localhost:8787/api/content');
        const data = await res.json();

        if (data.hero) {
            const heroTitle = document.querySelector('h1.text-2xl');
            if (heroTitle) heroTitle.innerHTML = data.hero.headline + '<br/>' + data.hero.subheadline;
        }
    } catch (e) {
        console.error('Failed to fetch dynamic content', e);
    }
}
