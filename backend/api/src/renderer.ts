
// This file is auto-generated from frontend/index.html. Does not use file system at runtime.
export function render(data: any): string {
    // Escape JSON for script injection
    const safeJson = JSON.stringify(data).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html class="light" lang="bn">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>${data.meta.title}</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,container-queries"></script>
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&amp;display=swap"
        rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#E11D48", // Vibrant Red for CTA
                        brand: "#2E3192",   // Purple/Blue for accents
                        accent: "#10B981",  // Green for success/trust
                        "background-light": "#F9FAFB",
                        "background-dark": "#111827",
                    },
                    fontFamily: {
                        display: ["Hind Siliguri", "sans-serif"],
                        sans: ["Hind Siliguri", "sans-serif"],
                    },
                    borderRadius: {
                        DEFAULT: "8px",
                    },
                },
            },
        };
    </script>
    <style type="text/tailwindcss">
        body { font-family: 'Hind Siliguri', sans-serif; }
        .countdown-box {
            background: #4C1D95;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 24px;
            font-weight: bold;
            min-width: 60px;
            text-align: center;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>

<body class="bg-background-light text-slate-900 transition-colors duration-200">
    <header class="bg-gradient-to-b from-green-50 to-white pt-8 pb-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <div class="flex flex-col items-center mb-6">
                <div class="text-3xl font-bold tracking-tighter text-brand flex items-center gap-2">
                    <span class="material-icons text-4xl">inventory_2</span>
                    <span id="header-logo">${data.header.logoText}</span>
                </div>
                <h1 id="header-headline" class="text-2xl md:text-3xl font-bold text-red-600 mt-4">${data.header.headline}</h1>
            </div>
            <div class="flex justify-center gap-3 mb-8">
                <div class="flex flex-col items-center">
                    <div class="countdown-box">00</div>
                    <span class="text-xs mt-1 font-semibold uppercase opacity-70">Hours</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="countdown-box">00</div>
                    <span class="text-xs mt-1 font-semibold uppercase opacity-70">Minutes</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="countdown-box">00</div>
                    <span class="text-xs mt-1 font-semibold uppercase opacity-70">Seconds</span>
                </div>
                <div class="flex flex-col items-center">
                    <div class="countdown-box">00</div>
                    <span class="text-xs mt-1 font-semibold uppercase opacity-70">Days</span>
                </div>
            </div>
            <div
                class="bg-brand text-white py-3 px-6 rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-lg">
                <span id="header-cta-text" class="text-lg font-semibold">${data.header.cta.text}</span>
                <a id="header-cta-btn"
                    class="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95"
                    href="#order-form">
                    ${data.header.cta.buttonText} <span class="material-icons text-sm">shopping_cart</span>
                </a>
            </div>
        </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 py-12">
        <section class="text-center mb-16">
            <h2 id="hero-headline" class="text-2xl md:text-3xl font-bold text-red-600 mb-2">${data.hero.headline}</h2>
            <p id="hero-subheadline" class="text-slate-600 mb-8">${data.hero.subheadline}</p>
            <div id="hero-showcase" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                ${data.hero.showcaseImages ? data.hero.showcaseImages.map((img: any) => `
                    <div class="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                        <img alt="${img.alt}" class="rounded-lg w-full aspect-[3/4] object-cover mb-2" src="${img.src}" />
                    </div>
                `).join('') : ''}
            </div>
            <div id="value-props-title"
                class="inline-block bg-brand text-white py-2 px-8 rounded-lg mb-8 font-bold text-lg">
                ${data.hero.valueProps.title}
            </div>
            <div id="value-props-list" class="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-10">
                ${data.hero.valueProps.items ? data.hero.valueProps.items.map((item: string) => `
                    <div class="flex items-start gap-3">
                        <span class="material-icons text-orange-500 mt-1">check_box</span>
                        <p class="font-medium">${item}</p>
                    </div>
                `).join('') : ''}
            </div>
            <div class="flex justify-center mb-12">
                <a id="hero-main-cta"
                    class="bg-primary hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-xl shadow-xl flex items-center gap-2"
                    href="#order-form">
                    ${data.hero.mainCta} <span class="material-icons">shopping_cart</span>
                </a>
            </div>
        </section>
        <section class="bg-slate-50/50 rounded-2xl p-6 md:p-10 mb-16 border border-slate-200">
            <div class="grid md:grid-cols-2 gap-10 items-center">
                <div class="relative">
                    <img id="combo-image" alt="Combo Offer" class="rounded-2xl shadow-2xl border-4 border-brand"
                        src="${data.comboOffer.image}" />
                    <div
                        class="absolute -bottom-4 -right-4 bg-brand text-white p-4 rounded-xl font-bold shadow-lg transform rotate-3">
                        <div id="combo-badge-line1" class="text-xl">${data.comboOffer.badge.line1}</div>
                        <div id="combo-badge-line2" class="text-3xl">${data.comboOffer.badge.line2}</div>
                    </div>
                </div>
                <div>
                    <h3 id="combo-details-title" class="text-2xl font-bold mb-4 text-brand">
                        ${data.comboOffer.details.title}
                    </h3>
                    <p id="combo-details-desc" class="mb-6 opacity-80 leading-relaxed">
                        ${data.comboOffer.details.description}
                    </p>
                    <ul id="combo-features-list" class="space-y-3 mb-8">
                        ${data.comboOffer.details.features ? data.comboOffer.details.features.map((feat: string) => `
                            <li class="flex items-center gap-2">
                                <span class="text-green-500 material-icons text-sm">fiber_manual_record</span> ${feat}
                            </li>
                        `).join('') : ''}
                    </ul>
                    <a id="combo-cta"
                        class="bg-primary text-white py-3 px-8 rounded-lg font-bold flex items-center justify-center gap-2 w-full md:w-auto"
                        href="#order-form">
                        ${data.comboOffer.details.cta} <span class="material-icons">shopping_cart</span>
                    </a>
                </div>
            </div>
        </section>
        <div id="pricing-container" class="grid md:grid-cols-2 gap-4 mb-16">
            ${data.pricing ? data.pricing.map((item: any) => `
                <div class="border-2 border-brand/20 bg-white p-4 rounded-xl text-center">
                    <span class="text-lg font-bold">${item.text} <span class="text-green-600 border-2 border-green-600 rounded-full px-2 py-0.5">${item.price}</span> ${item.unit}</span>
                </div>
            `).join('') : ''}
        </div>
        <p id="trust-badge-text" class="text-center text-lg font-semibold max-w-3xl mx-auto mb-16 px-4">
            ${data.trustBadge.text}
        </p>
        <section class="bg-[#10B981] text-white rounded-3xl p-6 md:p-12 mb-20 text-center shadow-2xl">
            <div class="mb-8 flex flex-col items-center">
                <div class="text-4xl font-black mb-2 flex items-center gap-2">
                    <span class="material-icons text-4xl">inventory_2</span> <span id="size-chart-logo-text">${data.header.logoText}</span>
                </div>
                <p id="size-chart-title" class="text-lg opacity-90">${data.sizeChart.title}</p>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-center border-collapse text-xl">
                    <thead>
                        <tr class="border-b-2 border-white/30">
                            <th class="py-4 font-bold uppercase">Size</th>
                            <th class="py-4 font-bold uppercase">Waist</th>
                            <th class="py-4 font-bold uppercase">Hip</th>
                            <th class="py-4 font-bold uppercase">Thai</th>
                            <th class="py-4 font-bold uppercase">Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-white/20">
                            <td class="py-4 font-bold">M</td>
                            <td class="py-4">30-32</td>
                            <td class="py-4">19</td>
                            <td class="py-4">23</td>
                            <td class="py-4">35</td>
                        </tr>
                        <tr class="border-b border-white/20">
                            <td class="py-4 font-bold">L</td>
                            <td class="py-4">34-36</td>
                            <td class="py-4">22</td>
                            <td class="py-4">24</td>
                            <td class="py-4">37</td>
                        </tr>
                        <tr class="border-b border-white/20">
                            <td class="py-4 font-bold">XL</td>
                            <td class="py-4">38-40</td>
                            <td class="py-4">23</td>
                            <td class="py-4">25</td>
                            <td class="py-4">39</td>
                        </tr>
                        <tr>
                            <td class="py-4 font-bold">XXL</td>
                            <td class="py-4">42-48</td>
                            <td class="py-4">28</td>
                            <td class="py-4">30</td>
                            <td class="py-4">42</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-8">
                <h4 class="text-3xl font-bold">5 pocket cargo pants</h4>
                <p class="mt-4 text-xl">More details- 01832-930900</p>
            </div>
        </section>
        <section class="mb-20">
            <h2 class="text-3xl font-bold text-slate-900 text-center mb-10">What Our Customers Say</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Static Reviews for now -->
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <img alt="Customer Wearing Cargo" class="w-full aspect-square object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Zt_qAtcHiBpl2XqnMQqRSU_nhxXkUcPK-BX48QoHxS30KyeeTvW0Lrqt24OkUR_6TliUmTjzzLZcKF8cXgk5PrgFCdvpMRQXSWQ9WHI1xsKRXvatXfuyT4XKw3VIVrMyUfmZYf0n73_z_OiXQ33b7RIubdY7d4JcVc2LfPaByC-T1z9rKW5PvJI1cC7maSnMono62VMmqamhylHoz-txTS6-Ew9KN4EWVYCLfVyn7vQ1LyvhycivFSdILHRdy8W5cjUEpVk8QPg" />
                    <div class="flex gap-1 text-orange-400 mb-2">
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700">"The quality of this Glace Cotton is amazing. The 10% stretch makes it so comfortable for all-day wear. Highly recommended!"</p>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">RJ</div>
                        <span class="text-xs font-bold opacity-70">Rafiqul J.</span>
                    </div>
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <img alt="Customer Wearing Cargo" class="w-full aspect-square object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIBgywTX7Etbpi6iu4oIpnHYFJP1QAobZwItMfv5D6YAV-tFNrPD0VGYpykVCUmXF2OFElxESv2RXflfZkBJ7dx7fy6nB8bU5MEKgvnF6EfcjtEQAwUHiOE0DAz0FMGwK2OqTQrhPTUgsFXTSVSTnGlDbOOa2xKcPkR95DNpMEOj0ahCr9feB4Z6lv32x_V_ab2d8N1HDwoXtjvv3Z_m75DoXYox_dTzl-wW2ea6xX0gRiquh1_BFe1-JWDJ2S9x6ngUOUZdg7Qpg" />
                    <div class="flex gap-1 text-orange-400 mb-2">
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700">"Perfect fit! I was worried about the size but the chart was very accurate. The fabric feels premium and the pockets are very useful."</p>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">AS</div>
                        <span class="text-xs font-bold opacity-70">Ahsan S.</span>
                    </div>
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <img alt="Customer Wearing Cargo" class="w-full aspect-square object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgKkC1e2EctdyUlvEW4s635DtmKNGJ2lN9161fiA-we4N1ippCBJKz6YJRr3iTkbbLB1dAYyJj6Qd2a1oH7gv-gRKXBeROiSxA7vF36rzp2qDy9uvxdsEYY2s-0yc-UV6JSE2ZJZu0mKx3IM-3QTlmTCMyFtbbnznTXLZEhlf1BioF-GAxr6Oz6DdQ6IdxMabGE8iGXchbA4qU74towstmjh-8JdrZ_VYuv--yU5GZ3SSLAwMnVSgc5BeEYKpKz2-rB1iys2094aE" />
                    <div class="flex gap-1 text-orange-400 mb-2">
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700">"Got the 2-piece combo and it's a steal for this price. The stitching is perfect and color doesn't fade after wash. Best cargo in BD."</p>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">MK</div>
                        <span class="text-xs font-bold opacity-70">Mahmud K.</span>
                    </div>
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <img alt="Customer Wearing Cargo" class="w-full aspect-square object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJhYomIyjXNNe101lWnGdwWIZLI871_fntNh1j6MyERFNNAQhNrm3W_v8BbWQVrIty1KyCNrpwS83AlzzxofYx1NkH5xGuczHHzJjvQeooiXQGYJvZNbTJEMJKX7rek2AMPH3yyZyMEjHqX-n7G8JSEM1jK5OW2QDca60iTumCruH-83Z0hreHf5NOpNhNiqgEs3Kdc7kdGxvK7PL35G1zTwwdVB7JOcA-a5jbvqJZT14Sj6t2QRZjEkz4bZVNbJuUNCP4iPSO05A" />
                    <div class="flex gap-1 text-orange-400 mb-2">
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                        <span class="material-symbols-outlined text-sm">star</span>
                    </div>
                    <p class="text-sm font-medium text-slate-700">"I use these for my bike tours and they are rugged yet soft. Very stylish and the fit is modern. Will buy more colors soon."</p>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">TN</div>
                        <span class="text-xs font-bold opacity-70">Tanvir N.</span>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="grid lg:grid-cols-5 gap-8 items-start" id="order-form">
            <div class="lg:col-span-3 space-y-8">
                <div>
                    <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <span
                            class="bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        <span id="order-step1-title">${data.orderForm.step1Title}</span>
                    </h3>
                    <div id="product-list-container" class="space-y-4">
                        <!-- Dynamic Products Injected via JS -->
                    </div>
                </div>
                <div class="space-y-6">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <span
                            class="bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        <span id="order-step2-title">${data.orderForm.step2Title}</span>
                    </h3>
                    <div class="grid gap-4">
                        <div>
                            <label id="label-name" class="block text-sm font-semibold mb-2">${data.orderForm.labels.name}</label>
                            <input id="customer_name"
                                class="w-full rounded-lg border-slate-300 focus:border-brand focus:ring-brand"
                                type="text" placeholder="${data.orderForm.labels.namePlaceholder}" />
                        </div>
                        <div>
                            <label id="label-address" class="block text-sm font-semibold mb-2">${data.orderForm.labels.address}</label>
                            <textarea id="customer_address"
                                class="w-full rounded-lg border-slate-300 focus:border-brand focus:ring-brand"
                                rows="3" placeholder="${data.orderForm.labels.addressPlaceholder}"></textarea>
                        </div>
                        <div>
                            <label id="label-phone" class="block text-sm font-semibold mb-2">${data.orderForm.labels.phone}</label>
                            <input id="customer_phone"
                                class="w-full rounded-lg border-slate-300 focus:border-brand focus:ring-brand"
                                type="tel" placeholder="${data.orderForm.labels.phonePlaceholder}" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <label id="label-size" class="block text-sm font-semibold mb-3">${data.orderForm.labels.size}</label>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand focus:ring-brand" name="size" type="radio" /> M *</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand focus:ring-brand" name="size" type="radio" /> L *</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand focus:ring-brand" name="size" type="radio" /> XL *</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand focus:ring-brand" name="size" type="radio" /> XXL *</label>
                            </div>
                        </div>
                        <div>
                            <label id="label-color" class="block text-sm font-semibold mb-3">${data.orderForm.labels.color}</label>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand rounded focus:ring-brand" name="color" value="Black"
                                        type="checkbox" /> Black</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand rounded focus:ring-brand" name="color" value="Grey"
                                        type="checkbox" /> Grey</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input
                                        class="text-brand rounded focus:ring-brand" name="color" value="Olive"
                                        type="checkbox" /> Olive</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 id="label-shipping" class="text-lg font-bold mb-4">${data.orderForm.labels.shippingTitle}</h3>
                        <div id="shipping-options-container"
                            class="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                            <!-- Dynamic Shipping Injected via JS -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-8">
                    <h3 id="summary-title" class="text-xl font-bold mb-6">${data.orderForm.summary.title}</h3>
                    <div class="space-y-4 mb-6">
                        <div class="flex items-start gap-4 pb-4 border-b border-slate-100">
                            <img alt="${data.orderForm.products[0].name}" class="w-12 h-12 rounded object-cover" src="${data.orderForm.products[0].image}" />
                            <div class="flex-1">
                                <p class="text-sm font-medium">${data.orderForm.products[0].name}</p>
                            </div>
                            <span class="font-bold">× ১ ${data.orderForm.products[0].price}৳</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-slate-500">Subtotal</span>
                            <span class="font-bold">${data.orderForm.products[0].price}৳</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-slate-500">Shipping</span>
                            <span class="font-bold">${data.orderForm.shippingOptions[0].price}৳</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold border-t border-slate-100 pt-4">
                            <span>Total</span>
                            <span class="text-brand">${parseInt(data.orderForm.products[0].price) + parseInt(data.orderForm.shippingOptions[0].price)}৳</span>
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-xl mb-6">
                        <p id="summary-cod-text" class="text-sm font-semibold mb-2">${data.orderForm.summary.codText}</p>
                        <label
                            class="flex items-center gap-2 text-sm bg-green-400 p-2 rounded text-white cursor-pointer">
                            <input checked="" class="rounded border-none focus:ring-0" type="checkbox" />
                            <span id="summary-cod-label">${data.orderForm.summary.codLabel}</span>
                        </label>
                    </div>
                    <p id="summary-disclaimer" class="text-[10px] text-slate-400 mb-6 leading-relaxed">
                        ${data.orderForm.summary.disclaimer}
                    </p>
                    <button id="order-btn"
                        class="w-full bg-primary hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all active:scale-95">
                        <span class="material-icons">lock</span> <span id="order-btn-text">${data.orderForm.summary.buttonText}</span>
                    </button>
                </div>
            </div>
        </div>
    </main>
    <footer class="bg-slate-100 py-12 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <p id="footer-contact-title" class="text-brand font-bold mb-4">${data.footer.contactTitle}</p>
            <div id="footer-numbers" class="text-lg font-bold flex flex-col gap-1">
                ${data.footer.phoneNumbers ? data.footer.phoneNumbers.map((num: string) => `<p>${num}</p>`).join('') : ''}
            </div>
            <div id="footer-copyright" class="mt-8 text-sm opacity-50">
                ${data.footer.copyright}
            </div>
        </div>
    </footer>
    <script>
        // Inject SSR Data
        window.siteContent = ${safeJson};
    </script>
    <script src="/client.js"></script>

</body>

</html>`;
}
