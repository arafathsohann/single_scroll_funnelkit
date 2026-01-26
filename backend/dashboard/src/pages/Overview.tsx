
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Stat {
    count: number;
    value: number;
}

interface AnalyticsData {
    total: Stat;
    delivered: Stat;
    canceled: Stat;
    pending: Stat;
    recentOrders: any[];
}

export default function Overview() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8787/api/analytics')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!data) return <div className="p-8">Error loading data</div>;

    const StatCard = ({ title, icon, color, stat }: { title: string, icon: string, color: string, stat: Stat }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full bg-${color}-50 flex items-center justify-center text-${color}-600`}>
                    <span className="material-icons">{icon}</span>
                </div>
                <div>
                    <p className="text-slate-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stat.count}</h3>
                </div>
            </div>
            <div className="text-sm text-slate-500">
                Value: <span className="font-semibold text-slate-700">৳{stat.value || 0}</span>
            </div>
        </div>
    );

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Overview</h1>
                <p className="text-slate-500">Store Performance</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Orders" icon="shopping_cart" color="blue" stat={data.total} />
                <StatCard title="Total Revenue" icon="payments" color="green" stat={{ count: data.total.count, value: data.total.value }} />
                <StatCard title="Delivered" icon="local_shipping" color="indigo" stat={data.delivered} />
                <StatCard title="Canceled" icon="cancel" color="red" stat={data.canceled} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
                    <Link to="/orders" className="text-brand font-medium hover:underline text-sm">View All</Link>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Customer</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Total</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.recentOrders.map((order: any) => (
                            <tr key={order.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-slate-600">#{order.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{order.customer_name}</td>
                                <td className="px-6 py-4 text-slate-600">৳{order.total_price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'canceled' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
