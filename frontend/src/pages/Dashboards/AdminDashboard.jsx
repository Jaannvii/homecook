import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, chefsRes, ordersRes] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/api/admin/chefs"),
          axios.get("/api/admin/orders")
        ]);
        setUsers(usersRes.data);
        setChefs(chefsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>🛠️ Admin Dashboard</h2>

      {/* Users */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-secondary text-white">Users</div>
        <div className="card-body">
          <p>Total Users: {users.length}</p>
          <Link to="/admin/users" className="btn btn-info btn-sm">Manage Users</Link>
        </div>
      </div>

      {/* Chefs */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-warning text-white">Chefs</div>
        <div className="card-body">
          <p>Total Chefs: {chefs.length}</p>
          <Link to="/admin/chefs" className="btn btn-warning btn-sm">Manage Chefs</Link>
        </div>
      </div>

      {/* Orders */}
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">Orders</div>
        <div className="card-body">
          <p>Total Orders: {orders.length}</p>
          <Link to="/admin/orders" className="btn btn-success btn-sm">Manage Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
