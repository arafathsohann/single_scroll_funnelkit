
export const LoginView = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { font-family: 'Inter', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-50 flex items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-gray-900">Sign In</h1>
                <p class="text-gray-500 text-sm mt-2">Enter your credentials to access the admin panel.</p>
            </div>
            <form id="loginForm" class="space-y-6">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" id="username" name="username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="admin" required>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" name="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" required>
                </div>
                <div id="error" class="hidden text-red-500 text-sm text-center bg-red-50 p-2 rounded"></div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                    Sign In
                </button>
            </form>
        </div>
        <script>
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const errorDiv = document.getElementById('error');
                
                try {
                    const res = await fetch('/admin/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await res.json();
                    
                    if (data.success) {
                        window.location.href = data.redirect || '/admin/dashboard';
                    } else {
                        errorDiv.textContent = data.error || 'Login failed';
                        errorDiv.classList.remove('hidden');
                    }
                } catch (err) {
                    errorDiv.textContent = 'An error occurred. Please try again.';
                    errorDiv.classList.remove('hidden');
                }
            });
        </script>
    </body>
    </html>
`;
