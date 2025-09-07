import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
    const [chefs, setChefs] = useState([]);
    const [menus, setMenus] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchChefs = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/chefs`, {
                withCredentials: true,
            });
            setChefs(Array.isArray(res.data) ? res.data : res.data.chefs || []);
        } catch (err) {
            console.error('Error fetching chefs:', err);
        }
    };

    const verifyChef = async (id) => {
        try {
            await axios.put(
                `${API_URL}/admin/verify-chef/${id}`,
                {},
                { withCredentials: true }
            );
            fetchChefs();
        } catch (err) {
            console.error('Error verifying chef:', err);
        }
    };

    const deleteChef = async (id) => {
        try {
            if (
                !window.confirm(
                    'Delete this chef? This action cannot be undone.'
                )
            )
                return;
            await axios.delete(`${API_URL}/chef/delete/${id}`, {
                withCredentials: true,
            });
            fetchChefs();
        } catch (err) {
            console.error('Error deleting chef:', err);
        }
    };

    const fetchMenus = async () => {
        try {
            const res = await axios.get(`${API_URL}/menu/`, {
                withCredentials: true,
            });
            setMenus(Array.isArray(res.data) ? res.data : res.data.menus || []);
        } catch (err) {
            console.error('Error fetching menus:', err);
        }
    };

    const approveMenu = async (id) => {
        try {
            await axios.put(
                `${API_URL}/admin/approve-menu/${id}`,
                {},
                { withCredentials: true }
            );
            fetchMenus();
        } catch (err) {
            console.error('Error approving menu:', err);
        }
    };

    const deleteMenu = async (id) => {
        try {
            if (!window.confirm('Delete this menu item?')) return;
            await axios.delete(`${API_URL}/menu/delete/${id}`, {
                withCredentials: true,
            });
            fetchMenus();
        } catch (err) {
            console.error('Error deleting menu:', err);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/orders`, {
                withCredentials: true,
            });
            setOrders(
                Array.isArray(res.data) ? res.data : res.data.orders || []
            );
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await axios.put(
                `${API_URL}/order/${id}/status`,
                { status },
                { withCredentials: true }
            );
            fetchOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    const deleteOrder = async (id) => {
        try {
            if (!window.confirm('Delete this order?')) return;
            await axios.delete(`${API_URL}/order/delete/${id}`, {
                withCredentials: true,
            });
            fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    useEffect(() => {
        fetchChefs();
        fetchMenus();
        fetchOrders();
    }, []);

    return (
        <div className="py-4 bgColor">
            <h1 className="mb-4 text-center title">Admin Dashboard</h1>

            <section className="container mb-5">
                <h4 className="mb-3 title">Chef Management</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Chef Name</th>
                                <th className="text-center py-2">Verified</th>
                                <th className="text-center py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chefs.length > 0 ? (
                                chefs.map((chef) => (
                                    <tr key={chef._id}>
                                        <td>
                                            {chef.name || chef.userName || '—'}
                                        </td>
                                        <td>{chef.isVerified ? '✅' : '❌'}</td>
                                        <td>
                                            {!chef.isVerified && (
                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() =>
                                                        verifyChef(chef._id)
                                                    }
                                                >
                                                    Verify Chef
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteChef(chef._id)
                                                }
                                            >
                                                Delete Chef
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-muted">
                                        No chefs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="container mb-5">
                <h4 className="mb-3 title">Menu Approval</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Item</th>
                                <th className="text-center py-2">Chef</th>
                                <th className="text-center py-2">Approved</th>
                                <th className="text-center py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.length > 0 ? (
                                menus.map((menu) => (
                                    <tr key={menu._id}>
                                        <td>{menu.itemName}</td>
                                        <td>
                                            {menu.chefId?.name ||
                                                menu.chefName ||
                                                '—'}
                                        </td>
                                        <td>{menu.isApproved ? '✅' : '❌'}</td>
                                        <td>
                                            {!menu.isApproved && (
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() =>
                                                        approveMenu(menu._id)
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteMenu(menu._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-muted">
                                        No menu items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="container mb-5">
                <h4 className="mb-3 title">Order Management</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Order ID</th>
                                <th className="text-center py-2">Customer</th>
                                <th className="text-center py-2">Menu</th>
                                <th className="text-center py-2">Status</th>
                                <th className="text-center py-2">
                                    Change Status
                                </th>
                                <th className="text-center py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {order.customerName ||
                                                order.userName ||
                                                '—'}
                                        </td>
                                        <td>
                                            {order.menuId?.itemName ||
                                                order.menuName ||
                                                '—'}
                                        </td>
                                        <td>{order.status}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={order.status}
                                                onChange={(e) =>
                                                    updateOrderStatus(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Confirmed">
                                                    Confirmed
                                                </option>
                                                <option value="Cooking">
                                                    Cooking
                                                </option>
                                                <option value="On the Way">
                                                    On the Way
                                                </option>
                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteOrder(order._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-muted">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
