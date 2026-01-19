document.addEventListener('DOMContentLoaded', () => {
    const orderBtn = document.getElementById('submit-order-btn');
    const nameInput = document.getElementById('client-name');
    const addressInput = document.getElementById('client-address');
    const phoneInput = document.getElementById('client-phone');

    // Price constants (in future, fetch from API)
    const PRODUCTS = {
        'single': { name: 'প্রিমিয়াম কার্গো প্যান্ট', price: 440 },
        'combo2': { name: 'প্রিমিয়াম কার্গো প্যান্ট কম্বো (২-প্যাক)', price: 1300 },
        'combo3': { name: 'প্রিমিয়াম কার্গো প্যান্ট কম্বো (৩-প্যাক)', price: 1800 }
    };

    let selectedProduct = 'single';
    let shippingCost = 70; // Inside Dhaka default

    // Handle Product Selection (You need to add values to radio buttons in HTML to make this robust, for now defaulting)
    // For this demo, we assume the simple flow.

    orderBtn.addEventListener('click', async () => {
        // validate
        if (!nameInput.value || !addressInput.value || !phoneInput.value) {
            alert('Please fill in all fields (Name, Address, Phone)');
            return;
        }

        const orderData = {
            customer_name: nameInput.value,
            customer_address: addressInput.value,
            customer_phone: phoneInput.value,
            product_summary: selectedProduct, // simplify for now
            total_price: 510 // simplify for now, should calculate dynamically
        };

        orderBtn.innerText = 'Creating Order...';
        orderBtn.disabled = true;

        try {
            const res = await fetch('http://localhost:8787/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await res.json();

            if (data.success) {
                alert('Order Placed Successfully! Order ID: ' + data.orderId);
                // Reset form
                nameInput.value = '';
                addressInput.value = '';
                phoneInput.value = '';
            } else {
                alert('Error: ' + data.error);
            }
        } catch (e) {
            alert('Network Error');
            console.error(e);
        } finally {
            orderBtn.innerText = 'অর্ডার করুন';
            orderBtn.disabled = false;
        }
    });

    // TODO: Add logic to update Total Price real-time based on Shipping/Product selection
});
