import { useEffect, useState } from 'react';

interface Order {
    id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    product_summary: string;
    total_price: number;
    status: string;
    created_at: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:8787/api/orders');
            const data = await res.json();
            if (Array.isArray(data)) {
                setOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Orders</h1>
                <p className="text-slate-500">Manage and view your recent orders</p>
            </header>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Customer</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Product</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Address</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Total</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{order.customer_name}</div>
                                        <div className="text-sm text-slate-500">{order.customer_phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{order.product_summary}</td>
                                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={order.customer_address}>
                                        {order.customer_address}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">৳{order.total_price}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    order.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                        'bg-slate-100 text-slate-700'}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
