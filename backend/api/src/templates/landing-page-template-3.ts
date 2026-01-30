
export const defaultData = {
    meta: {
        title: 'Premium Hoodie Bundle - Sunshine Mart'
    },
    header: {
        logoText: 'SUNSHINE'
    },
    hero: {
        headline: 'প্রিমিয়াম সাব্লিমেশন হুডি প্লাস <span class="text-secondary">ফ্রি সোয়েটশার্ট</span>',
        subheadline: 'অফার প্রাইজ মাত্র ১০৫০ টাকা',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-P6dtIjf-jQErfnHMLmIGMD8nk_cifqfus6lpx15ir0uJwtV1kgnMEUqj207dBTEMyOlwMbINuMTTocpYM9bPC1BWKGv-L1UwfP0IucMKRXMsQsMrKQBdzHV_gtdb-UfNf4DTuc8IlAcYgvY0nYwkfNHDKziDO7MrBEjan06vGfoS-2BT3CpWClCOMKotQLQNCN3kKSMspRiCK5t4KEL7wSwPdFOCrNHmbM-NH_lDVDngdMsMriZZlzSt4nyh7sFYYIsgrBB-J4IF'
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
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#4338ca", // Indigo-700
                        secondary: "#ef4444", // Red-500
                        "background-light": "#f0f9ff", // Sky-50
                        "background-dark": "#0f172a", // Slate-900
                        "surface-light": "#ffffff",
                        "surface-dark": "#1e293b",
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
        }.scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300">
<header class="w-full py-4 bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-50">
<div class="container mx-auto px-4 flex justify-center">
<div class="flex items-center gap-2">
<span class="material-icons text-primary text-4xl">layers</span>
<div class="flex flex-col">
<span class="text-xl font-bold leading-none tracking-wide text-slate-900 dark:text-white" ${b('header.logoText')}>${content.header.logoText}</span>
<span class="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right">mart</span>
</div>
</div>
</div>
</header>
<section class="relative overflow-hidden pt-10 pb-16 lg:pt-20">
<div class="container mx-auto px-4">
<div class="flex flex-col-reverse lg:flex-row items-center gap-12">
<div class="w-full lg:w-1/2 text-center lg:text-left space-y-6">
<h1 class="text-3xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-white" ${b('hero.headline')}>
    ${content.hero.headline}
</h1>
<h2 class="text-2xl lg:text-3xl font-bold text-primary" ${b('hero.subheadline')}>
    ${content.hero.subheadline}
</h2>
<ul class="space-y-3 text-lg text-slate-700 dark:text-slate-300 inline-block text-left">
<li class="flex items-center gap-3">
<span class="material-icons text-secondary">local_fire_department</span>
<span>প্রিমিয়াম চায়না বেন্টেক ফেব্রিক</span>
</li>
<li class="flex items-center gap-3">
<span class="material-icons text-secondary">check_circle</span>
<span>300 GSM - শীতের জন্য পারফেক্ট</span>
</li>
<li class="flex items-center gap-3">
<span class="material-icons text-secondary">verified</span>
<span>ডিজিটাল সাব্লিমেশন প্রিন্ট - ১০০% কালার গ্যারান্টি</span>
</li>
<li class="flex items-center gap-3">
<span class="material-icons text-secondary">thumb_up</span>
<span>হাই কোয়ালিটি রিব ও কলার - ডিউরেবল ও কম্ফোর্টেবল</span>
</li>
</ul>
<div class="pt-4">
<a class="inline-flex items-center justify-center bg-primary hover:bg-indigo-800 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 text-xl animate-pulse" href="#order-form">
                            অর্ডার করতে চাই
                            <span class="material-icons ml-2">shopping_cart</span>
</a>
</div>
</div>
<div class="w-full lg:w-1/2 relative">
<div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 bg-gray-200">
<img alt="Premium Hoodie Bundle Mockup" class="w-full h-auto object-cover transform hover:scale-105 transition duration-700" src="${content.hero.image}" ${b('hero.image')}/>
<div class="absolute top-4 right-4 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                            Buy 1 Get 1 FREE
                        </div>
</div>
<div class="text-center mt-4 font-semibold text-primary">
                        হুডি সেট নাম্বার ৩
                    </div>
</div>
</div>
</div>
</section>
<!-- Static Content follows... -->
<section class="py-16 bg-white dark:bg-slate-800">
<div class="container mx-auto px-4">
<h2 class="text-center text-2xl lg:text-3xl font-bold mb-10 text-slate-800 dark:text-white">
                স্টাইলিশ ও আরামদায়ক চায়না ফেব্রিক এর <span class="border-b-4 border-primary">প্রিমিয়াম হুডি</span>
</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="group relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-700">
<img alt="Hoodie Design 1" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmy_hFieCZWT-BRl0vKX8qfKamyIPK4mqo3lqSFuxSmHtAvALaTycYfvnvmYUnm3YS0S6uUJsqoCy3z_DFdN_CenfgK_4Gqc4iX2UdBqKZX9XxNAHUsBf_tDSJ7xnjA9-Zfmbyf6W18157yw35uE3e-r4qqGXQmioZwnc9NxoFNl8GtaoiTWfd4IJjMpbEcgf6iaTYkMfxJ7OB7NdTm4ZkyEYDUoZr58SNh469a4oDok8FnJnUyd046QubDpT_U47ckaRvjs8alWxR"/>
<div class="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                        Design 01
                    </div>
</div>
<div class="group relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-700">
<img alt="Hoodie Design 2" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIzoS2URwjE8FG8xby-ALbCjTWQfVqX_SowsrwyZBRWITNbIj1lLPNpjQVxYZpWoEL79Os_euBXxgH4Uk1ETqeAXztY9hsWRfir-_CoTjd_taXu_N9uPu0jGdTHSnCvW5MtH7G1udSVn_elzlM49eXLUDfMeWqaw72qUIdaB81JLo9QQdFRwJnn3-wnljs6YYMpOh8KYEvtsKpwqlmLviFt1f_xswf4XAoR6LKsvGyrlcNwLTMgyJhmW1Mq7owzdwAjZIL2pywQK7K"/>
<div class="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                        Design 02
                    </div>
</div>
<div class="group relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-700">
<img alt="Hoodie Design 3" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5l1m87Ym_P6qdXCyVbKKfuQ2W0oEsfNxlh3fWbzxL-mt-akcbY_vYJ2nDxz7ZDXovb2K3OOSJzs-MbtFNECmy4wn2t5bp_dLMi7w4RkR6x78CR7Yq6TEyhlgMKLYO5SzM2iduiC6zqORezFHPrKh5nd7wJCEux8jUcp4K-sKTYfa2Hcg7AH3x6xtbk-1KKthUC2lSlHCSx-kI8TCBndQEZ64MEjzx5I3dRY0GE75MIFGJA4ZLhSthfesz616zKK72fpyvwCVTNn7o"/>
<div class="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                        Design 03
                    </div>
</div>
</div>
<div class="flex justify-center mt-6 space-x-2">
<span class="h-2 w-2 rounded-full bg-primary"></span>
<span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
<span class="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
</div>
</div>
</section>
<section class="py-16 bg-background-light dark:bg-background-dark">
<div class="container mx-auto px-4 text-center">
<h3 class="text-xl lg:text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                যেকোনো ১টি হুডির সাথে পেয়ে যাবেন সুন্দর এই সোয়েটশার্টটি <span class="text-primary text-3xl">সম্পূর্ণ ফ্রি</span>
</h3>
<div class="relative max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800 p-4 border border-gray-200 dark:border-slate-700">
<div class="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded shadow">COZY | COMFORTABLE</div>
<img alt="Free Sweatshirt Gift" class="w-full h-auto rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARw8FJ1nT4YeUDKDWCENZxeC7cz305U0sB5nB-z19XsQUT3kGzkJzA1LxUFJHU_cmWPmJqEpb1rKPpJ9l9W52Fjfcb4lGOHEN4M6faWc0DeeKxH-WdNcUh1ZbKBDrg6Mcq8sAbd9qs6qyHpfGofK54dihQ8XsFtN0nB56bzxIBRHn4g3m3fCQDK7nANWLS8viA6j_N3a1mbH9I7GCbq2J5-K9Wio-ahYJOHjr3MIg84WfxlOBXl6W8XRbcu8-7j8UhlzMGXIKEa_U1"/>
<div class="mt-4 flex justify-between items-center px-4">
<div class="text-left">
<p class="text-sm text-gray-500 dark:text-gray-400">Exclusive Design</p>
<p class="font-bold text-lg text-slate-800 dark:text-white">Winter Collection</p>
</div>
<a class="bg-black text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1" href="#order-form">
<span class="material-icons text-sm">shopping_bag</span> Order Now
                    </a>
</div>
</div>
</div>
</section>
<section class="py-16 bg-white dark:bg-slate-800">
<div class="container mx-auto px-4">
<h2 class="text-center text-3xl font-bold mb-8 text-slate-800 dark:text-white">সাইজ চার্ট</h2>
<div class="max-w-4xl mx-auto space-y-8">
<div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
<table class="w-full text-sm text-center text-slate-600 dark:text-slate-300">
<thead class="text-xs text-white uppercase bg-slate-800 dark:bg-slate-900">
<tr>
<th class="px-6 py-3" colspan="6" scope="col">HOODIE SIZE GUIDE</th>
</tr>
<tr class="bg-slate-700 dark:bg-slate-800">
<th class="px-6 py-3" scope="col">SIZE</th>
<th class="px-6 py-3" scope="col">CHEST</th>
<th class="px-6 py-3" scope="col">LENGTH</th>
<th class="px-6 py-3" scope="col">SLEEVE</th>
<th class="px-6 py-3" scope="col">CUFF</th>
<th class="px-6 py-3" scope="col">SHOULDER</th>
</tr>
</thead>
<tbody>
<tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
<td class="px-6 py-4 font-bold">M</td>
<td class="px-6 py-4">40</td>
<td class="px-6 py-4">27</td>
<td class="px-6 py-4">23.5</td>
<td class="px-6 py-4">3.5</td>
<td class="px-6 py-4">17</td>
</tr>
<tr class="bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600">
<td class="px-6 py-4 font-bold">L</td>
<td class="px-6 py-4">42</td>
<td class="px-6 py-4">28</td>
<td class="px-6 py-4">24</td>
<td class="px-6 py-4">3.5</td>
<td class="px-6 py-4">17.5</td>
</tr>
<tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
<td class="px-6 py-4 font-bold">XL</td>
<td class="px-6 py-4">44</td>
<td class="px-6 py-4">29</td>
<td class="px-6 py-4">24.5</td>
<td class="px-6 py-4">4</td>
<td class="px-6 py-4">18</td>
</tr>
<tr class="bg-gray-50 dark:bg-slate-700">
<td class="px-6 py-4 font-bold">XXL</td>
<td class="px-6 py-4">46</td>
<td class="px-6 py-4">30</td>
<td class="px-6 py-4">25</td>
<td class="px-6 py-4">4</td>
<td class="px-6 py-4">19</td>
</tr>
</tbody>
</table>
</div>
<div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
<table class="w-full text-sm text-center text-slate-600 dark:text-slate-300">
<thead class="text-xs text-white uppercase bg-slate-800 dark:bg-slate-900">
<tr>
<th class="px-6 py-3" colspan="5" scope="col">SWEATSHIRT SIZE GUIDE</th>
</tr>
<tr class="bg-slate-700 dark:bg-slate-800">
<th class="px-6 py-3" scope="col">SIZE</th>
<th class="px-6 py-3" scope="col">CHEST</th>
<th class="px-6 py-3" scope="col">LENGTH</th>
<th class="px-6 py-3" scope="col">SLEEVE</th>
<th class="px-6 py-3" scope="col">SHOULDER</th>
</tr>
</thead>
<tbody>
<tr class="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
<td class="px-6 py-4 font-bold">M</td>
<td class="px-6 py-4">39</td>
<td class="px-6 py-4">27.5</td>
<td class="px-6 py-4">24.25</td>
<td class="px-6 py-4">18.5</td>
</tr>
<tr class="bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600">
<td class="px-6 py-4 font-bold">L</td>
<td class="px-6 py-4">40.75</td>
<td class="px-6 py-4">28.25</td>
<td class="px-6 py-4">24.75</td>
<td class="px-6 py-4">18</td>
</tr>
<tr class="bg-white dark:bg-slate-800">
<td class="px-6 py-4 font-bold">XL</td>
<td class="px-6 py-4">43</td>
<td class="px-6 py-4">29</td>
<td class="px-6 py-4">25</td>
<td class="px-6 py-4">19</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</section>
<section class="py-20 bg-[#1e1b4b] dark:bg-black text-white text-center">
<div class="container mx-auto px-4">
<h3 class="text-xl lg:text-2xl font-light mb-2">হুডি+সোয়েটশার্ট কম্বো - রেগুলার প্রাইজ ২১৮০ টাকা</h3>
<h2 class="text-3xl lg:text-5xl font-bold mb-6">
<span class="text-secondary">৫০% ডিসকাউন্ট</span> অফার প্রাইজ মাত্র <span class="text-yellow-400">১০৫০৳</span>
</h2>
<div class="flex items-center justify-center gap-2 mb-8 text-secondary font-bold text-lg animate-bounce">
<span class="material-icons">local_fire_department</span>
<span>অফারটি সীমিত সময় পর্যন্ত চলবে!!</span>
</div>
<div class="flex justify-center gap-4 mb-10">
<div class="bg-white text-slate-900 rounded-lg p-3 w-20">
<div class="text-2xl font-bold">12</div>
<div class="text-xs uppercase">Hours</div>
</div>
<div class="bg-white text-slate-900 rounded-lg p-3 w-20">
<div class="text-2xl font-bold">05</div>
<div class="text-xs uppercase">Minutes</div>
</div>
<div class="bg-white text-slate-900 rounded-lg p-3 w-20">
<div class="text-2xl font-bold text-secondary">22</div>
<div class="text-xs uppercase">Seconds</div>
</div>
</div>
<a class="inline-flex items-center gap-2 bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-12 rounded-full border-2 border-primary shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:scale-105 transition" href="#order-form">
<span class="material-icons">thumb_up</span> অর্ডার করতে চাই
            </a>
</div>
</section>
<section class="py-16 bg-black text-white">
<div class="container mx-auto px-4">
<h2 class="text-center text-2xl lg:text-3xl font-bold mb-10">
                আমাদের সম্মানিত কাস্টমারদের <span class="text-white border-b-2 border-white">রিভিউ!</span>
</h2>
<div class="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
<div class="min-w-[300px] md:min-w-[400px] snap-center bg-white text-slate-900 rounded-xl p-4">
<div class="flex items-center gap-3 mb-3">
<div class="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuEq_BfwQ2-c-h-t-k-l-v-o-b-m-R-0-j-v-k-1-F-t"/>
</div>
<div>
<p class="font-bold text-sm">Muhammad Jony</p>
<p class="text-xs text-gray-500">2 hours ago</p>
</div>
</div>
<p class="text-sm mb-3">কাপড়ের কোয়ালিটি মাশাল্লাহ অনেক ভালো। ১০৫০ টাকায় ২টা পিস ভাবাই যায় না। ডেলিভারিও ফাস্ট ছিল।</p>
</div>
</div>
</div>
</section>
<script>
    window.siteContent = ${safeJson};
</script>
<script src="/client.js"></script>
</body></html>
`;
}
