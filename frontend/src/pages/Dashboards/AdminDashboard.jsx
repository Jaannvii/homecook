import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
    const [chefs, setChefs] = useState([]);
    const [menus, setMenus] = useState([]);
    const [orders, setOrders] = useState([]);

    const [chefMsg, setChefMsg] = useState('');
    const [chefSuccess, setChefSuccess] = useState(false);

    const [menuMsg, setMenuMsg] = useState('');
    const [menuSuccess, setMenuSuccess] = useState(false);

    const [orderMsg, setOrderMsg] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    const fetchChefs = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/chefs`, {
                withCredentials: true,
            });
            setChefs(Array.isArray(res.data) ? res.data : res.data.chefs || []);
        } catch (err) {
            setChefMsg('Error fetching chefs');
            setChefSuccess(false);
        }
    };

    const verifyChef = async (id) => {
        try {
            await axios.put(
                `${API_URL}/admin/verify-chef/${id}`,
                {},
                { withCredentials: true }
            );
            setChefMsg('Chef verified successfully');
            setChefSuccess(true);
            fetchChefs();
        } catch (err) {
            setChefMsg('Error verifying chef');
            setChefSuccess(false);
        } finally {
            setTimeout(() => {
                setChefMsg('');
                setChefSuccess(null);
            }, 3000);
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
            setChefMsg('Chef deleted successfully');
            setChefSuccess(true);
            fetchChefs();
        } catch (err) {
            setChefMsg('Error deleting chef');
            setChefSuccess(false);
        } finally {
            setTimeout(() => {
                setChefMsg('');
                setChefSuccess(null);
            }, 3000);
        }
    };

    const fetchMenus = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/menu/`, {
                withCredentials: true,
            });
            setMenus(Array.isArray(res.data) ? res.data : res.data.menus || []);
        } catch (err) {
            setMenuMsg('Error fetching items');
            setMenuSuccess(false);
        }
    };

    const approveMenu = async (id) => {
        try {
            await axios.put(
                `${API_URL}/admin/approve-menu/${id}`,
                {},
                { withCredentials: true }
            );
            setMenuMsg('Item approved successfully');
            setMenuSuccess(true);
            fetchMenus();
        } catch (err) {
            setMenuMsg('Error approving item');
            setMenuSuccess(false);
        } finally {
            setTimeout(() => {
                setMenuMsg('');
                setMenuSuccess(null);
            }, 3000);
        }
    };

    const deleteMenu = async (id) => {
        try {
            if (!window.confirm('Delete this menu item?')) return;
            await axios.delete(`${API_URL}/menu/delete/${id}`, {
                withCredentials: true,
            });
            setMenuMsg('Item deleted successfully');
            setMenuSuccess(true);
            fetchMenus();
        } catch (err) {
            setMenuMsg('Error deleting item');
            setMenuSuccess(false);
        } finally {
            setTimeout(() => {
                setMenuMsg('');
                setMenuSuccess(null);
            }, 3000);
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
            setOrderMsg('Error fetching orders');
            setOrderSuccess(false);
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await axios.put(
                `${API_URL}/order/${id}/status`,
                { status },
                { withCredentials: true }
            );
            setOrderMsg('Order status updated');
            setOrderSuccess(true);
            fetchOrders();
        } catch (err) {
            setOrderMsg('Error updating order status');
            setOrderSuccess(false);
        } finally {
            setTimeout(() => {
                setOrderMsg('');
                setOrderSuccess(null);
            }, 3000);
        }
    };

    const deleteOrder = async (id) => {
        try {
            if (!window.confirm('Delete this order?')) return;
            await axios.delete(`${API_URL}/order/delete/${id}`, {
                withCredentials: true,
            });
            setOrderMsg('Order deleted successfully');
            setOrderSuccess(true);
            fetchOrders();
        } catch (err) {
            setOrderMsg('Error deleting order');
            setOrderSuccess(false);
        } finally {
            setTimeout(() => {
                setOrderMsg('');
                setOrderSuccess(null);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchChefs();
        fetchMenus();
        fetchOrders();
    }, []);

    return (
        <div className="bgColor">
            <h1 className="py-4 text-center title">Admin Dashboard</h1>

            <section className="container mb-5">
                <h4 className="mb-3 title">Chef Management</h4>
                {chefMsg && (
                    <p
                        className={`text-center ${
                            chefSuccess ? 'text-success' : 'text-danger'
                        } mt-2`}
                    >
                        {chefMsg}
                    </p>
                )}
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
                                        <td className="text-center">
                                            {chef.name || chef.userName || '—'}
                                        </td>
                                        <td className="text-center">
                                            {chef.isVerified ? '✅' : '❌'}
                                        </td>
                                        <td className="text-center">
                                            {!chef.isVerified && (
                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() =>
                                                        verifyChef(chef._id)
                                                    }
                                                >
                                                    Verify
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteChef(chef._id)
                                                }
                                            >
                                                Delete
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
                <h4 className="mb-3 title">Item Approval</h4>
                {menuMsg && (
                    <p
                        className={`text-center ${
                            menuSuccess ? 'text-success' : 'text-danger'
                        } mt-2`}
                    >
                        {menuMsg}
                    </p>
                )}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Chef Name</th>
                                <th className="text-center py-2">Item Name</th>
                                <th className="text-center py-2">Approved</th>
                                <th className="text-center py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.length > 0 ? (
                                menus.map((menu) => (
                                    <tr key={menu._id}>
                                        <td className="text-center">
                                            {menu.chefId?.name ||
                                                menu.chefName ||
                                                '—'}
                                        </td>
                                        <td className="text-center">
                                            {menu.itemName}
                                        </td>
                                        <td className="text-center">
                                            {menu.isApproved ? '✅' : '❌'}
                                        </td>
                                        <td className="text-center">
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
                {orderMsg && (
                    <p
                        className={`text-center ${
                            orderSuccess ? 'text-success' : 'text-danger'
                        } mt-2`}
                    >
                        {orderMsg}
                    </p>
                )}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Order ID</th>
                                <th className="text-center py-2">
                                    Customer Name
                                </th>
                                <th className="text-center py-2">Item</th>
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
                                        <td className="text-center">
                                            {order._id}
                                        </td>
                                        <td className="text-center">
                                            {order.customer?.name || '—'}
                                        </td>
                                        <td className="text-center">
                                            {order.items &&
                                            order.items.length > 0
                                                ? order.items.map((item) => (
                                                      <div key={item._id}>
                                                          {item.food?.itemName}{' '}
                                                          × {item.quantity}
                                                      </div>
                                                  ))
                                                : '—'}
                                        </td>
                                        <td className="text-center">
                                            {order.status}
                                        </td>
                                        <td className="text-center">
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
                                        <td className="text-center">
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
