import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
    const [chefs, setChefs] = useState([]);
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    const fetchChefs = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/chefs`, {
                withCredentials: true,
            });
            console.log('Fetched chefs:', res.data);
            setChefs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Error fetching chefs:', err);
            setMessage('Failed to load chefs');
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
            setMessage('Failed to verify chef');
        }
    };

    const deleteChef = async (id) => {
        try {
            await axios.delete(`${API_URL}/chef/delete/${id}`, {
                withCredentials: true,
            });
            fetchChefs();
        } catch (err) {
            console.error('Error deleting chef:', err);
            setMessage('Failed to delete chef');
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/orders`, {
                withCredentials: true,
            });
            setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setMessage('Failed to load orders');
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
            setMessage('Failed to update order status');
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${API_URL}/order/delete/${id}`, {
                withCredentials: true,
            });
            fetchOrders();
        } catch (err) {
            console.error('Error deleting order:', err);
            setMessage('Failed to delete order');
        }
    };

    useEffect(() => {
        fetchChefs();
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
                            {chefs.map((chef) => (
                                <tr key={chef._id}>
                                    <td>{chef.name}</td>
                                    <td>{chef.isVerified ? '✅' : '❌'}</td>
                                    <td>
                                        {!chef.isVerified && (
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() =>
                                                    verifyChef(chef._id)
                                                }
                                            >
                                                Verify Chef
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteChef(chef._id)}
                                        >
                                            Delete Chef
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="container">
                <h4 className="mb-3 title">Order Management</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="text-center py-2">Order ID</th>
                                <th className="text-center py-2">Status</th>
                                <th className="text-center py-2">
                                    Change Status
                                </th>
                                <th className="text-center py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
