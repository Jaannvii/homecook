import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders/user")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>👤 User Dashboard</h2>

      {/* Orders */}
      <div className="card shadow-sm mt-3">
        <div className="card-header bg-primary text-white">My Orders</div>
        <div className="card-body">
          {orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            <ul className="list-group">
              {orders.map((order) => (
                <li key={order.id} className="list-group-item d-flex justify-content-between">
                  Order #{order.id} — {order.status}
                  <Link to={`/order/${order.id}`} className="btn btn-sm btn-info">
                    Track Order
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Cart */}
      <Link to="/cart" className="btn btn-success mt-3">
        🛒 Go to Cart
      </Link>
    </div>
  );
};

export default UserDashboard;