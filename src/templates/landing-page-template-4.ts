
export const defaultData = {
    meta: {
        title: 'Product Landing Page Funnel - Clearance Sale'
    },
    header: {
        logoText: 'LUXE_WEAR'
    },
    hero: {
        headline: 'Premium <br/>Polo Series',
        price: '750 TK',
        originalPrice: '1,450 TK',
        description: 'Our highest quality combed cotton polos are now available at clearance prices. Breathable, durable, and designed for the perfect fit.',
        videoThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb9SzwXLqkvRx7WVYabUT1wZ2M62GKne2XhcuV-crYrXCoDetk6oKH03SdCEnfEDTyEfq3rqWjzUYViJXagM6QD_sjSTEalh7L3RvMW7DzrU02S4e1C6DA7VW4shCMc-IlDoF9LsC7Tkx5fO20U5gbNagyrttzTR-XyHfcxJ49Ce4wPAXD4HoS1Eiez5M9V2b9ZAhck60pD8ew4uKpnJoObR6SVgUDiqrHDGBZM_8ytk0L1n81C9paTZ6aJ07k8A5iZNmKUOnyysk'
    },
    orderForm: {
        shippingOptions: [
            { label: 'Inside Dhaka', price: '70' },
            { label: 'Outside Dhaka', price: '130' }
        ]
    }
};

export function render(data: any): string {
    const content = Object.keys(data).length > 0 ? data : defaultData;
    const safeJson = JSON.stringify(content).replace(/</g, '\\u003c');
    const b = (path: string) => `data-bind="${path}"`;

    return `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${content.meta.title}</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#0b1445",
                        "accent": "#FFA500",
                        "background-light": "#F5F6FA",
                        "background-dark": "#1a1d23",
                        "card-white": "#FFFFFF"
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "full": "9999px"
                    },
                    boxShadow: {
                        'soft-elevation': '0 10px 30px rgba(0,0,0,0.08)',
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: "Space Grotesk", sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-primary dark:text-white antialiased">
<!-- 1. Top Announcement Bar -->
<div class="w-full bg-primary py-3 text-center sticky top-0 z-50">
<p class="text-accent font-bold tracking-wider text-sm md:text-base">
            Clearance Sale 🔥 (700-750 TK) — Limited Stock Remaining!
        </p>
</div>
<div class="flex flex-col items-center w-full">
<!-- Header / Nav -->
<header class="w-full max-w-[1200px] flex items-center justify-between px-6 py-6 bg-transparent">
<div class="flex items-center gap-2">
<div class="size-8 bg-primary dark:bg-accent rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">diamond</span>
</div>
<h2 class="text-primary dark:text-white text-xl font-bold tracking-tight" ${b('header.logoText')}>${content.header.logoText}</h2>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-medium hover:text-accent transition-colors" href="#gallery">Collection</a>
<a class="text-sm font-medium hover:text-accent transition-colors" href="#size-chart">Size Guide</a>
<a class="text-sm font-medium hover:text-accent transition-colors" href="#reviews">Reviews</a>
</nav>
<button class="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-opacity-90 transition-all shadow-soft-elevation" onclick="document.getElementById('order-form').scrollIntoView({behavior: 'smooth'})">
                Shop Now
            </button>
</header>
<main class="w-full max-w-[1200px] px-6">
<!-- 2. Hero Section -->
<section class="py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div class="flex flex-col gap-6">
<div class="inline-flex bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-widest">
                        Flash Clearance
                    </div>
<h1 class="text-5xl md:text-7xl font-black leading-[1.1] text-primary dark:text-white" ${b('hero.headline')}>
    ${content.hero.headline}
</h1>
<div class="flex items-baseline gap-4">
<span class="text-4xl font-bold text-accent" ${b('hero.price')}>${content.hero.price}</span>
<span class="text-xl text-gray-400 line-through" ${b('hero.originalPrice')}>${content.hero.originalPrice}</span>
</div>
<p class="text-gray-600 dark:text-gray-400 text-lg max-w-md" ${b('hero.description')}>
    ${content.hero.description}
</p>
<div class="flex gap-4 pt-4">
<a class="flex-1 md:flex-none flex items-center justify-center bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:translate-y-[-2px] transition-all shadow-lg" href="#order-form">
                            Order Now
                        </a>
<button class="flex items-center justify-center border-2 border-primary/10 px-6 py-4 rounded-xl font-bold hover:bg-white transition-all">
<span class="material-symbols-outlined">share</span>
</button>
</div>
</div>
<!-- Video Player Component -->
<div class="relative group">
<div class="aspect-video bg-primary rounded-2xl overflow-hidden shadow-soft-elevation relative flex items-center justify-center group cursor-pointer" data-alt="Model wearing a navy blue premium polo shirt" style='background-image: url("${content.hero.videoThumbnail}"); background-size: cover; background-position: center;' ${b('hero.videoThumbnail')}>
<div class="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all"></div>
<button class="z-10 size-20 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined !text-4xl">play_arrow</span>
</button>
<!-- Controls Mockup -->
<div class="absolute inset-x-0 bottom-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
<div class="flex h-1 items-center justify-center mb-2">
<div class="h-1 flex-1 rounded-full bg-accent"></div>
<div class="h-1 w-24 rounded-full bg-white opacity-40"></div>
</div>
<div class="flex items-center justify-between text-white text-[10px] font-bold uppercase tracking-widest">
<span>Product Showcase</span>
<span>01:42</span>
</div>
</div>
</div>
</div>
</section>
<!-- 3. Gallery Section -->
<section class="py-16" id="gallery">
<div class="flex flex-col gap-8">
<div class="w-full h-[500px] bg-white rounded-2xl shadow-soft-elevation overflow-hidden flex items-center justify-center">
<div class="w-full h-full bg-center bg-no-repeat bg-cover" data-alt="High quality white polo shirt close up fabric texture" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOZmKQT3QUI5kt9tmzL_k4s0H6Wyt0NVVRWY2RZxBU1NYGVmhqL0tMgRGBraz5BjP_mJlFRxXJxBe30NLd9ImpNa7ShXi7hCr8yqadjnAmX1IjLjDBxGYNTsUCvInMX3in9zvNoy1IUuAMsYu5X9QQ0F1uBmS5Qa31tRt6qL32jU5kqnODw3HVU94AapWSiMCe--kXCHneFEwKWVWx_3c7e_eT54ez4bQIYiH3IOO73vDf53olVeO39dtwg9MXkjokXZ8jkdTJtc4");'>
</div>
</div>
<div class="grid grid-cols-4 md:grid-cols-6 gap-4">
    <!-- Gallery Thumbnails (Static in HTML, kept static for now but could be dynamic) -->
<div class="aspect-square rounded-xl overflow-hidden border-2 border-accent cursor-pointer shadow-sm">
<div class="w-full h-full bg-center bg-cover" data-alt="White polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqEK_F0foz4n8jvbQYo9Wpc7OGTEEhNohiEgBqf7ovoOH9e0VUWze_7be3OJqP4nRdI4dhE8_ZhRY2pgnx-M4g_sBQTYsc3fashwVlYfES2XkuEW7K271C9-trIiMJT4vvcLGItU9BgjDvozbX3rGuDpEP7MjEcGAGn8ivzKRe-1e_Sdkd4lb4TbxKsVLOy74zGxVqzUimoknQLqJQrn8XsCzTne5CpT1WkPrjmPV1MX0QrLmXF5tfCSiRakMIJUrf5h_h1BaVI-A");'></div>
</div>
<!-- ... more thumbnails ... -->
<div class="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer shadow-sm transition-all">
<div class="w-full h-full bg-center bg-cover" data-alt="Navy blue polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHYc79LDyJdzOXy6pJiSqI4dVwS-O_q5nVAyQhqbcgi-guWnDhZeXVbEd84fX7ZjeQYf4lQFLSyQYFsr4E812C1SbZPWAgMBOfMGw5DnJuH_leQ7HVQ0jIMEpHOLtPGbeDF4ULRTereTFuAeFM-yxeQyCqgTWxtwB8PjIqKkqgltVBLwfOzPHAE7FE-ld0m6DGMawDqsyS5wZMN3FhX_yZaqY68jOJOJEhtqJAlYwHawvQAPQlZWACtfGLjnLAelvl_vh-mKJKV8s");'></div>
</div>
<!-- Keeping all original thumbnails for fidelity -->
<div class="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer shadow-sm transition-all">
<div class="w-full h-full bg-center bg-cover" data-alt="Light blue polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbMnZ3im-DXQVQi2HxRG77-cOJgpPirkDJhavEwZf70niVbO49WwUmHiiSREEuJlVSV3MLLl-XvhgH1rxOLwikY5zvwzOo9kNRZ7ArwEE9TlYOkAGGYNGlcQ4NsAoB5fhNwBMOUdpeZCotYvUgN1rkOIs8Go8_2nDyXdR7MIi5nBuAKX56H0zjcwEZr-XhOqvntXi7wKXGS40FR1vEuNKrXxHOSk0BWA3ZqMmaMQZ2ueJn2xPNnuNlAXfbIXlNk06mqU4sl70SYlQ");'></div>
</div>
<div class="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer shadow-sm transition-all">
<div class="w-full h-full bg-center bg-cover" data-alt="Red polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8672ruKEBOY660usXsyubriEjLXysTZnCpNVi7bpPnCEkFtE7H4mG236Ff2CRiAGouj4eaU5uxm_6tx0cvEvE9xAxn2MPaAk5ketJLfQalMXbVWnhsmvvxKTE9pPp8H8sr1w1X1AGqpCLgesxgW4UyMptdaSMjO4flYdvrAdQJizMn--avnuSOuL3UUASDpcVWvZs__aABXSv872wHWBZeDRlf8y4TW1HyyKAhAkjpBJJgIFmVPhpke2JPWbkB9yp2piUuo4FbUQ");'></div>
</div>
<div class="hidden md:block aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer shadow-sm transition-all">
<div class="w-full h-full bg-center bg-cover" data-alt="Grey polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvEu9i-YuTete-X7mM-qRiUq0yGERcwLuhw6ROUvC2op-jfdviRIkFx7NUG4ie7TqtY0vE7OlPX9vjT6IxE78QD_EUoBn11LIUCR4DU9yuvvXLVrmPP33wVqPcwwQ-DJkSqeQAYkp9xOHc-E_8MNB6RdocsM4kBUm9Nmmfj_YFyLTY6O9V7Txyns-aCp6DhpmvHFaFI-guZEbAAmFjJzzI3iyveMaq_pZRAxPXDgbqSsITtXDakIbxIU2FFENBEOdVvDJ99uk1-8c");'></div>
</div>
<div class="hidden md:block aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-accent cursor-pointer shadow-sm transition-all">
<div class="w-full h-full bg-center bg-cover" data-alt="Black polo variant" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpG3gFsidxkOzTHKkg8IwxjG6SediMaupWi49ZFUSkNfT1LTdxJ-8of_oHMykpfQdLkeOe3mKrMty9TnO43rdg8TFTY4hiiNURr_jONbg70T1OozZOyKjKrJRNZ12efXTBSx7H3sjdFZAqJbr_JjGdZf4I0n2S1aRfNkDmUCmIk7lZBWoZMyRhgwVaFXeHO8YRjaQEJ3u_aeTYZPUxjy89-OAMlZSyOpfYr1e5RA67Uq3AYlLYHNMBUNdWadFLqnPrHKJ0qayBYIM");'></div>
</div>
</div>
</div>
</section>
<!-- 4. Features Grid -->
<section class="py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
<div class="bg-white dark:bg-primary/20 p-8 rounded-2xl shadow-soft-elevation flex flex-col items-center text-center gap-4 border border-white dark:border-primary/30">
<div class="size-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
<span class="material-symbols-outlined !text-3xl">high_quality</span>
</div>
<h3 class="font-bold text-lg text-primary dark:text-white">Premium Fabric</h3>
<p class="text-sm text-gray-500">100% Combed Cotton for ultimate comfort.</p>
</div>
<div class="bg-white dark:bg-primary/20 p-8 rounded-2xl shadow-soft-elevation flex flex-col items-center text-center gap-4 border border-white dark:border-primary/30">
<div class="size-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
<span class="material-symbols-outlined !text-3xl">air</span>
</div>
<h3 class="font-bold text-lg text-primary dark:text-white">Breathable</h3>
<p class="text-sm text-gray-500">Advanced moisture-wicking technology.</p>
</div>
<div class="bg-white dark:bg-primary/20 p-8 rounded-2xl shadow-soft-elevation flex flex-col items-center text-center gap-4 border border-white dark:border-primary/30">
<div class="size-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
<span class="material-symbols-outlined !text-3xl">local_shipping</span>
</div>
<h3 class="font-bold text-lg text-primary dark:text-white">Fast Delivery</h3>
<p class="text-sm text-gray-500">Across Bangladesh within 48-72 hours.</p>
</div>
<div class="bg-white dark:bg-primary/20 p-8 rounded-2xl shadow-soft-elevation flex flex-col items-center text-center gap-4 border border-white dark:border-primary/30">
<div class="size-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
<span class="material-symbols-outlined !text-3xl">verified_user</span>
</div>
<h3 class="font-bold text-lg text-primary dark:text-white">QC Passed</h3>
<p class="text-sm text-gray-500">Triple-checked for defects before shipping.</p>
</div>
</section>
<!-- 5. Color Variants -->
<section class="py-16">
<h2 class="text-3xl font-black mb-10 text-primary dark:text-white">Select Your Hue</h2>
<div class="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
<div class="min-w-[200px] flex-shrink-0 bg-white dark:bg-primary/20 p-4 rounded-2xl shadow-soft-elevation border-2 border-accent transition-all">
<div class="aspect-square bg-blue-900 rounded-xl mb-4" data-alt="Deep Navy Swatch"></div>
<p class="font-bold text-center">Midnight Navy</p>
</div>
<div class="min-w-[200px] flex-shrink-0 bg-white dark:bg-primary/20 p-4 rounded-2xl shadow-soft-elevation border-2 border-transparent hover:border-gray-200 transition-all">
<div class="aspect-square bg-gray-100 rounded-xl mb-4 border border-gray-100" data-alt="Classic White Swatch"></div>
<p class="font-bold text-center">Classic White</p>
</div>
<div class="min-w-[200px] flex-shrink-0 bg-white dark:bg-primary/20 p-4 rounded-2xl shadow-soft-elevation border-2 border-transparent hover:border-gray-200 transition-all">
<div class="aspect-square bg-red-700 rounded-xl mb-4" data-alt="Ruby Red Swatch"></div>
<p class="font-bold text-center">Crimson Red</p>
</div>
<div class="min-w-[200px] flex-shrink-0 bg-white dark:bg-primary/20 p-4 rounded-2xl shadow-soft-elevation border-2 border-transparent hover:border-gray-200 transition-all">
<div class="aspect-square bg-black rounded-xl mb-4" data-alt="Pitch Black Swatch"></div>
<p class="font-bold text-center">Stealth Black</p>
</div>
<div class="min-w-[200px] flex-shrink-0 bg-white dark:bg-primary/20 p-4 rounded-2xl shadow-soft-elevation border-2 border-transparent hover:border-gray-200 transition-all">
<div class="aspect-square bg-gray-500 rounded-xl mb-4" data-alt="Heather Grey Swatch"></div>
<p class="font-bold text-center">Storm Grey</p>
</div>
</div>
</section>
<!-- 6. Social Proof / Reviews -->
<section class="py-16" id="reviews">
<div class="flex justify-between items-end mb-10">
<div>
<h2 class="text-3xl font-black text-primary dark:text-white">Customer Love</h2>
<p class="text-gray-500 mt-2">Hear it from those who already bought.</p>
</div>
<div class="flex gap-2">
<button class="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="bg-white p-6 rounded-2xl shadow-soft-elevation">
<div class="flex items-center gap-4 mb-4">
<div class="size-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">AS</div>
<div>
<h4 class="font-bold text-sm">Abidur S.</h4>
<div class="flex text-accent scale-75 origin-left">
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
</div>
</div>
</div>
<p class="text-sm italic text-gray-600">"The quality is insane for 750 TK. I bought 3 colors! Fitting is just perfect."</p>
</div>
<div class="bg-white p-6 rounded-2xl shadow-soft-elevation border-2 border-accent/20">
<div class="flex items-center gap-4 mb-4">
<div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">MR</div>
<div>
<h4 class="font-bold text-sm">Mahfuz R.</h4>
<div class="flex text-accent scale-75 origin-left">
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
</div>
</div>
</div>
<p class="text-sm italic text-gray-600">"Received in Dhaka within 24 hours. Fabric feels premium and very breathable."</p>
</div>
<div class="bg-white p-6 rounded-2xl shadow-soft-elevation">
<div class="flex items-center gap-4 mb-4">
<div class="size-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">TZ</div>
<div>
<h4 class="font-bold text-sm">Tanvir Z.</h4>
<div class="flex text-accent scale-75 origin-left">
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star</span>
<span class="material-symbols-outlined !text-sm">star_half</span>
</div>
</div>
</div>
<p class="text-sm italic text-gray-600">"Great collection. I hope they restock the XL White soon. Definitely recommended."</p>
</div>
</div>
</section>
<!-- 7. Size Chart Section -->
<section class="py-16" id="size-chart">
<div class="bg-primary rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
<div class="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px]"></div>
<h2 class="text-3xl font-black mb-8 relative z-10 text-accent">Find Your Fit</h2>
<div class="overflow-x-auto relative z-10">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-white/10 uppercase text-xs tracking-widest text-white/60">
<th class="py-4 px-4">Size</th>
<th class="py-4 px-4">Chest (Inches)</th>
<th class="py-4 px-4">Length (Inches)</th>
<th class="py-4 px-4">Shoulder (Inches)</th>
</tr>
</thead>
<tbody class="text-sm md:text-base">
<tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
<td class="py-4 px-4 font-bold">M</td>
<td class="py-4 px-4">38</td>
<td class="py-4 px-4">27</td>
<td class="py-4 px-4">16.5</td>
</tr>
<tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
<td class="py-4 px-4 font-bold">L</td>
<td class="py-4 px-4">40</td>
<td class="py-4 px-4">28</td>
<td class="py-4 px-4">17.5</td>
</tr>
<tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
<td class="py-4 px-4 font-bold">XL</td>
<td class="py-4 px-4">42</td>
<td class="py-4 px-4">29</td>
<td class="py-4 px-4">18.5</td>
</tr>
<tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
<td class="py-4 px-4 font-bold text-accent">XXL</td>
<td class="py-4 px-4">44</td>
<td class="py-4 px-4">30</td>
<td class="py-4 px-4">19.5</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
<!-- 8. Order Form Section -->
<section class="py-24 max-w-2xl mx-auto" id="order-form">
<div class="bg-white dark:bg-background-dark p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-primary/50">
<div class="text-center mb-10">
<h2 class="text-4xl font-black text-primary dark:text-white mb-4">Complete Order</h2>
<p class="text-gray-500">Free home delivery on orders of 3+ items!</p>
</div>
<form action="#" class="space-y-6">
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
<input id="customer_name" class="w-full px-6 py-4 rounded-xl border-gray-200 focus:border-accent focus:ring-accent bg-gray-50 dark:bg-primary/10 transition-all outline-none" placeholder="Enter your full name" type="text"/>
</div>
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
<input id="customer_phone" class="w-full px-6 py-4 rounded-xl border-gray-200 focus:border-accent focus:ring-accent bg-gray-50 dark:bg-primary/10 transition-all outline-none" placeholder="017XX XXXXXX" type="tel"/>
</div>
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-widest text-gray-400">Delivery Address</label>
<textarea id="customer_address" class="w-full px-6 py-4 rounded-xl border-gray-200 focus:border-accent focus:ring-accent bg-gray-50 dark:bg-primary/10 transition-all outline-none" placeholder="Full address (House, Road, Area)" rows="3"></textarea>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-widest text-gray-400">Select Size</label>
<select name="size" class="w-full px-6 py-4 rounded-xl border-gray-200 focus:border-accent focus:ring-accent bg-gray-50 dark:bg-primary/10 outline-none">
<option value="M">Size M</option>
<option value="L">Size L</option>
<option value="XL">Size XL</option>
<option value="2XL">Size XXL</option>
</select>
</div>
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-widest text-gray-400">Quantity</label>
<input class="w-full px-6 py-4 rounded-xl border-gray-200 focus:border-accent focus:ring-accent bg-gray-50 dark:bg-primary/10 outline-none" min="1" type="number" value="1"/>
</div>
</div>

<div class="space-y-2 mt-4">
    <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Shipping</label>
      ${content.orderForm.shippingOptions.map((opt: any, i: number) => `
    <label class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        <div class="flex items-center">
            <input class="form-radio text-accent h-5 w-5" name="shipping" type="radio" value="${opt.price}" ${i === 0 ? 'checked' : ''}/>
            <span class="ml-3 font-bold text-gray-700 dark:text-gray-200">${opt.label}</span>
        </div>
        <span class="font-bold text-primary dark:text-white">${opt.price} TK</span>
    </label>
    `).join('')}
</div>

<div class="pt-6">
<div id="summary-shim" class="mb-4"></div>
<button id="order-btn" class="w-full bg-accent text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:translate-y-[-2px] hover:shadow-2xl transition-all uppercase tracking-widest" type="button">
                                Confirm Order
                            </button>
<p class="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2 uppercase tracking-tighter">
<span class="material-symbols-outlined !text-sm">lock</span>
                                Secure checkout via Cash on Delivery
                            </p>
</div>
</form>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full bg-primary py-12 px-6 mt-20 text-white/50">
<div class="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex items-center gap-2 grayscale brightness-200 opacity-50">
<div class="size-6 bg-white rounded-md flex items-center justify-center text-primary">
<span class="material-symbols-outlined !text-xs">diamond</span>
</div>
<h2 class="text-white text-lg font-bold tracking-tight">LUXE_WEAR</h2>
</div>
<div class="flex gap-8 text-sm uppercase tracking-widest font-bold">
<a class="hover:text-accent transition-colors" href="#">Privacy</a>
<a class="hover:text-accent transition-colors" href="#">Terms</a>
<a class="hover:text-accent transition-colors" href="#">Track Order</a>
</div>
<p class="text-xs">© 2024 Luxe Wear Limited. All Rights Reserved.</p>
</div>
</footer>
</div>
<script>
    window.siteContent = ${safeJson};
</script>
<script src="/client.js"></script>
</body></html>
`;
}
