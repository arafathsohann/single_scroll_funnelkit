
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100';
    };

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold text-brand flex items-center gap-2">
                        <span className="material-icons">inventory_2</span> ACE Dashboard
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/')}`}
                    >
                        <span className="material-icons">dashboard</span>
                        Overview
                    </Link>
                    <Link
                        to="/orders"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/orders')}`}
                    >
                        <span className="material-icons">shopping_cart</span>
                        Orders
                    </Link>
                    <Link
                        to="/inventory"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/inventory')}`}
                    >
                        <span className="material-icons">inventory</span>
                        Inventory
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3 text-slate-500">
                        <span className="material-icons">account_circle</span>
                        <span>Admin</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
