
export const defaultData = {
    meta: {
        title: 'Premium Polo Collar Sweater Landing Page'
    },
    hero: {
        headline: 'Premium polo collar sweater',
        subheadline: '২ টি ৯৯০ টাকা মাত্র (70% Discount)',
        priceText: 'আগের মূল্য (২ পিস) <span class="text-red-600 line-through decoration-2 decoration-red-600">২৫০০ টাকা</span>'
    },
    orderForm: {
        products: [
            {
                id: 'combo1',
                name: 'Sweater Drop collar-Olive & Brown (Default)',
                price: '990',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3QBn9gLRqkeeG7qbMZEhjFUpxTcLcAY07HLU4QcKL2sTYbhEPifecImL-dhAsxzBKbO0wzstO52P_vhu5V_ICwPelsGAPGZzUL5m8i71lAqPCu-lXf393S2iDQxC1mqPQrAKj2Y23ofLzXDWVD_Wl7nxkJyGPlYtLe_8Kas-u_zTw2l01IXUBlB9B3jUH8A44gLUsWpOze6fMHo3LDbNXkg1Jpa9dambUmqK56Cn2JG5GAjHVzWjwKC3hDbUmuuzUFy5DzLgh159m'
            }
        ],
        shippingOptions: [
            { label: 'Inside Dhaka', price: '70' },
            { label: 'Outside Dhaka', price: '130' }
        ]
    },
    contact: {
        phone: '01645244956'
    }
};

export function render(data: any): string {
    const content = Object.keys(data).length > 0 ? data : defaultData;
    const safeJson = JSON.stringify(content).replace(/</g, '\\u003c');
    const b = (path: string) => `data-bind="${path}"`;

    return `<!DOCTYPE html>
<html lang="bn"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${content.meta.title}</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#A91B60", // Magenta color from buttons
                        "header-bg": "#1F2937", // Dark blue/gray header
                        "accent-red": "#EF4444", // Red text
                        "background-light": "#F3F4F6",
                        "background-dark": "#111827",
                        "card-light": "#FFFFFF",
                        "card-dark": "#1F2937",
                        "border-blue": "#3B82F6", // Checkout border
                        "checkout-btn": "#F97316", // Orange checkout button
                    },
                    fontFamily: {
                        display: ["'Hind Siliguri'", "sans-serif"],
                    },
                    borderRadius: {
                        DEFAULT: "0.5rem",
                    },
                },
            },
        };
    </script>
<style>
        body {
            font-family: 'Hind Siliguri', sans-serif;
        }::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #888; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 antialiased font-display">
<header class="w-full flex flex-col items-center pt-8 pb-4 px-4 bg-gray-100 dark:bg-gray-900">
<div class="bg-header-bg w-full max-w-4xl rounded-lg py-4 px-2 text-center shadow-lg mb-6">
<h1 class="text-2xl md:text-3xl font-bold text-accent-red" ${b('hero.headline')}>
    ${content.hero.headline}
</h1>
<h2 class="text-xl md:text-2xl font-bold text-accent-red mt-1" ${b('hero.subheadline')}>
    ${content.hero.subheadline}
</h2>
</div>
<div class="w-full max-w-2xl border-2 border-black dark:border-white rounded-full py-2 px-8 text-center mb-6 bg-white dark:bg-gray-800">
<p class="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100" ${b('hero.priceText')}>
    ${content.hero.priceText}
</p>
</div>
<button class="bg-primary hover:bg-pink-700 text-white font-bold py-3 px-8 rounded shadow-md transition duration-300 animate-bounce" onclick="document.getElementById('order-form').scrollIntoView({behavior: 'smooth'})">
            অর্ডার করতে চাই
        </button>
</header>
<section class="max-w-6xl mx-auto px-4 py-8">
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="aspect-[3/4] overflow-hidden rounded-lg shadow-lg group relative">
<img alt="Green Polo Sweater" class="object-cover w-full h-full transform group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3QBn9gLRqkeeG7qbMZEhjFUpxTcLcAY07HLU4QcKL2sTYbhEPifecImL-dhAsxzBKbO0wzstO52P_vhu5V_ICwPelsGAPGZzUL5m8i71lAqPCu-lXf393S2iDQxC1mqPQrAKj2Y23ofLzXDWVD_Wl7nxkJyGPlYtLe_8Kas-u_zTw2l01IXUBlB9B3jUH8A44gLUsWpOze6fMHo3LDbNXkg1Jpa9dambUmqK56Cn2JG5GAjHVzWjwKC3hDbUmuuzUFy5DzLgh159m"/>
<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
</div>
<div class="aspect-[3/4] overflow-hidden rounded-lg shadow-lg group relative">
<img alt="Black Polo Sweater" class="object-cover w-full h-full transform group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu1RvtRe4I8lKCWWyE0Po1TZfUoa6vajHknc7DQaGyVeo3YLsGQOXyPsAKgYmLV2GO-2iT-g5HOtZgeIUIpC7NbpZcypIyLjx6Ld72CZEpELWE4n150UHhV9xa0sa_ruz-cq0jH7_QIbzhuC6_oSvK1QQPQ-yGzkSjvPS2sYUXdxK3z-6xn5xL3l_x1NZR6LEcqPDu1LrBIVvzxzbEt3yrbi4GQ_9ZKM4lij2TGaN2tTBnkzwoubwqxwRN18YBOTZWC6e9DIWUnZEq"/>
<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
</div>
<div class="aspect-[3/4] overflow-hidden rounded-lg shadow-lg group relative">
<img alt="Brown Polo Sweater" class="object-cover w-full h-full transform group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyIlnUVjM8M-HROIZai0YZPp_gUxrrI8OXqvyaRit_ENjqaG7YZypomSahfMnnDJCA__zvEciv4UkL67TO8Zx6amvLuHf8yaOBpd_sgowbWnVQo_bORN3Nq3piovYxKK8tDmMrYOlGLsxUd72CZEpELWE4n150UHhV9xa0sa_ruz-cq0jH7_QIbzhuC6_oSvK1QQPQ-yGzkSjvPS2sYUXdxK3z-6xn5xL3l_x1NZR6LEcqPDu1LrBIVvzxzbEt3yrbi4GQ_9ZKM4lij2TGaN2tTBnkzwoubwqxwRN18YBOTZWC6e9DIWUnZEq"/>
<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
</div>
</div>
<div class="flex justify-center space-x-2 mt-6">
<span class="h-2 w-2 rounded-full bg-gray-400"></span>
<span class="h-2 w-2 rounded-full bg-gray-800 dark:bg-white"></span>
<span class="h-2 w-2 rounded-full bg-gray-400"></span>
<span class="h-2 w-2 rounded-full bg-gray-400"></span>
<span class="h-2 w-2 rounded-full bg-gray-400"></span>
</div>
<div class="flex justify-center mt-6">
<button class="bg-primary hover:bg-pink-700 text-white font-bold py-3 px-8 rounded shadow-md transition duration-300" onclick="document.getElementById('order-form').scrollIntoView({behavior: 'smooth'})">
                অর্ডার করতে চাই
            </button>
</div>
</section>
<section class="max-w-6xl mx-auto px-4 py-12">
<!-- Static content section omitted for brevity -->
<div class="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-card-dark rounded-xl shadow-lg p-6 md:p-10 border border-gray-200 dark:border-gray-700">
<div class="w-full md:w-1/2">
<h3 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white border-b-2 border-gray-200 pb-2">Measurements</h3>
<div class="overflow-x-auto">
<table class="w-full text-center border-collapse text-sm md:text-base">
<thead>
<tr class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
<th class="p-3 border border-gray-300 dark:border-gray-600">SIZE (সাইজ)</th>
<th class="p-3 border border-gray-300 dark:border-gray-600">CHEST (বুকের মাপ)</th>
<th class="p-3 border border-gray-300 dark:border-gray-600">LENGTH (লম্বা)</th>
</tr>
</thead>
<tbody class="text-gray-600 dark:text-gray-300">
<tr>
<td class="p-3 border border-gray-300 dark:border-gray-600 font-bold">M</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">৩৬-৪১"</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">২৭"</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800">
<td class="p-3 border border-gray-300 dark:border-gray-600 font-bold">L</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">৪২-৪৩"</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">২৮"</td>
</tr>
<tr>
<td class="p-3 border border-gray-300 dark:border-gray-600 font-bold">XL</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">৪৪-৪৫"</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">২৯"</td>
</tr>
<tr class="bg-gray-50 dark:bg-gray-800">
<td class="p-3 border border-gray-300 dark:border-gray-600 font-bold">XXL</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">৪৬-৪৭"</td>
<td class="p-3 border border-gray-300 dark:border-gray-600">৩০"</td>
</tr>
</tbody>
</table>
</div>
<div class="mt-8 text-center">
<button class="bg-primary hover:bg-pink-700 text-white font-bold py-3 px-10 rounded shadow-md transition duration-300" onclick="document.getElementById('order-form').scrollIntoView({behavior: 'smooth'})">
                        অর্ডার করতে চাই
                    </button>
</div>
</div>
<div class="w-full md:w-1/2">
<img alt="Men wearing polo sweater lifestyle" class="rounded-lg shadow-md w-full h-auto object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAepVXv328zgVlxhAoMMR7MTjc2pal5gkoFOakqYYjvo6V5BcvXGLDgROkyWqBz-B-_2X7GV866E736U_sjEWPWK0-eh5s_m8_knI2MrEtjR3PWhhCEH0sE9RHPBPFb-0a_WR-n3H6YxuT_HvUUUnzgRQCQcP9-D6EmWNAHluhNrQBgzZFHXWt682cxlsAZOG6iKGKs2atSwz0Okl9q-PUaaH1oOfrfB5XSJrD9Ks_Vq-6AIUG2hMR5yLD4ijj7TWx61O8atkXaH3RQ"/>
</div>
</div>
</section>
<section class="max-w-6xl mx-auto px-4 py-16" id="order-form">
<div class="border-4 border-sky-400 dark:border-sky-600 bg-white dark:bg-card-dark p-4 md:p-8 rounded-lg shadow-xl">
<div class="text-center mb-8">
<h2 class="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-500 mb-4">২ টি ৯৯০ টাকা মাত্র</h2>
<p class="text-gray-700 dark:text-gray-300 font-medium">কোন কারনে আপনার পছন্দ না হলে আপনি ডেলিভারি ফি প্রদান করে রিটার্ন করতে পারবেন।</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
<div>
<h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2">পণ্য সিলেক্ট করুন</h3>
<div class="space-y-4 mb-8">
    ${content.orderForm.products.map((prod: any, i: number) => `
    <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        <label class="flex items-center space-x-3 cursor-pointer flex-1">
            <input class="form-radio h-5 w-5 text-green-600 rounded focus:ring-green-500" name="product" type="radio" value="${prod.id}" data-price="${prod.price}" ${i === 0 ? 'checked' : ''}/>
            <div class="w-12 h-12 rounded overflow-hidden">
                 <img alt="${prod.name}" class="w-full h-full object-cover" src="${prod.image}" />
            </div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">${prod.name}</span>
        </label>
        <div class="flex items-center space-x-4">
             <div class="text-right">
                <p class="text-sm font-bold text-gray-800 dark:text-gray-100">${prod.price}৳</p>
            </div>
        </div>
    </div>
    `).join('')}
</div>

<h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Billing details</h3>
<div class="space-y-4">
<div>
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">নাম <span class="text-red-500">*</span></label>
<input id="customer_name" class="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="আপনার নাম লিখুন" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ঠিকানা <span class="text-red-500">*</span></label>
<input id="customer_address" class="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="House number and street name" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ফোন নাম্বার <span class="text-red-500">*</span></label>
<input id="customer_phone" class="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="আপনার মোবাইল নাম্বার লিখুন" type="tel"/>
</div>
</div>
<div class="mt-6">
<label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">সাইজ <span class="text-red-500">*</span></label>
<div class="flex flex-col space-y-2">
    ${['M size', 'L size', 'XL size', '2XL size'].map(size => `
    <label class="inline-flex items-center cursor-pointer">
        <input class="form-radio text-blue-600 h-4 w-4" name="size" type="radio" value="${size}"/>
        <span class="ml-2 text-gray-700 dark:text-gray-200">${size}</span>
    </label>
    `).join('')}
</div>
</div>
<div class="mt-8">
<h4 class="text-lg font-bold mb-3 text-gray-800 dark:text-white">Shipping</h4>
<div class="bg-white dark:bg-gray-700 border rounded-md overflow-hidden">
     ${content.orderForm.shippingOptions.map((opt: any, i: number) => `
    <label class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
        <div class="flex items-center">
            <input class="form-radio text-orange-500 h-4 w-4" name="shipping" type="radio" value="${opt.price}" ${i === 0 ? 'checked' : ''}/>
            <span class="ml-3 text-gray-700 dark:text-gray-200">${opt.label}</span>
        </div>
        <span class="font-bold text-gray-800 dark:text-white">${opt.price}৳</span>
    </label>
    `).join('')}
</div>
</div>
</div>
<div class="flex flex-col">
<h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Your order</h3>
<div class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 mb-6">
<!-- Static Summary shim for Layout -->
<div class="space-y-4 mb-6" id="summary-shim"></div>
</div>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-gray-600 dark:text-gray-400 text-sm">
                        Cash on delivery
                    </div>
<button id="order-btn" class="w-full bg-checkout-btn hover:bg-orange-600 text-white font-bold py-4 px-6 rounded flex items-center justify-center space-x-2 shadow-lg transition duration-300 transform hover:-translate-y-1">
<span class="material-icons text-xl">lock</span>
<span class="text-lg">Place Order</span>
</button>
</div>
</div>
</div>
</section>
<footer class="bg-black text-white py-8 mt-12 border-t border-gray-800">
<div class="max-w-4xl mx-auto text-center px-4">
<h2 class="text-2xl font-bold mb-2">POLO</h2>
<p class="text-gray-400 text-sm mb-4">Contact Us - ${content.contact.phone}</p>
<div class="flex justify-center gap-4 mb-6">
<a class="text-gray-400 hover:text-white" href="#"><span class="material-icons">facebook</span></a>
<a class="text-gray-400 hover:text-white" href="#"><span class="material-icons">phone</span></a>
</div>
<p class="text-[10px] text-gray-600">
                © 2024 POLO. All rights reserved. Powered by Onylo
            </p>
</div>
</footer>
<script>
    window.siteContent = ${safeJson};
</script>
<script src="/client.js"></script>
</body></html>
`;
}
