
export const ProfileView = (user: any, success?: string, error?: string) => `
    <header class="flex-shrink-0 px-8 py-6 bg-background-light dark:bg-background-dark sticky top-0 z-40">
        <div class="max-w-7xl mx-auto w-full">
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Profile</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Update your admin credentials.</p>
        </div>
    </header>
    <div class="flex-1 overflow-y-auto px-8 pb-12">
        <div class="max-w-2xl mx-auto w-full bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
            ${success ? `<div class="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">${success}</div>` : ''}
            ${error ? `<div class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">${error}</div>` : ''}
            
            <form method="POST" action="/admin/profile" class="space-y-6">
                <div>
                     <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                     <input type="text" name="username" value="${user?.username || ''}" class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary">
                </div>
                <div>
                     <label class="block text-sm font-medium text-slate-700 mb-1">New Password (leave blank to keep current)</label>
                     <input type="password" name="password" class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary">
                </div>
                 <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors">
                    Update Profile
                </button>
            </form>
        </div>
    </div>
`;
