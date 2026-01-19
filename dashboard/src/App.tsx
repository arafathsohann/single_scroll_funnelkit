import { useEffect, useState } from 'react';
import './App.css';

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

function App() {
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

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Funnel Dashboard</h1>
        <div className="stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>৳{totalRevenue}</p>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>
                      <div>{order.customer_name}</div>
                      <div className="sub-text">{order.customer_phone}</div>
                    </td>
                    <td>{order.product_summary}</td>
                    <td className="address-cell">{order.customer_address}</td>
                    <td>৳{order.total_price}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
