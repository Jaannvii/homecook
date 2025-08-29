import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChefDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch chef's orders & menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, menuRes] = await Promise.all([
          axios.get("/api/orders/chef"),
          axios.get("/api/menu/chef")
        ]);
        setOrders(ordersRes.data);
        setMenuItems(menuRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">👨‍🍳 Chef Dashboard</h2>

      {/* Orders Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">Pending Orders</div>
        <div className="card-body">
          {orders.length === 0 ? (
            <p>No pending orders.</p>
          ) : (
            <ul className="list-group">
              {orders.map((order) => (
                <li key={order.id} className="list-group-item d-flex justify-content-between">
                  Order #{order.id} — {order.status}
                  <Link className="btn btn-sm btn-primary" to={`/order/${order.id}`}>
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Menu Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">Your Menu</div>
        <div className="card-body">
          {menuItems.length === 0 ? (
            <p>No menu items added yet.</p>
          ) : (
            <ul className="list-group">
              {menuItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.name} — ₹{item.price}
                  <Link className="btn btn-sm btn-warning" to={`/menu/edit/${item.id}`}>
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link className="btn btn-success mt-3" to="/menu/add">
            ➕ Add New Dish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
