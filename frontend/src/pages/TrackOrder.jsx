import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL;

const steps = ['Pending', 'Confirmed', 'Cooking', 'On the Way', 'Delivered'];

const TrackOrder = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/order/`, {
                withCredentials: true,
            });
            const activeOrders = res.data.orders.filter(
                (o) => o.status !== 'Delivered' && o.status !== 'Cancelled'
            );
            setOrders(activeOrders);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            await axios.put(
                `${API_URL}/order/${orderId}/cancel`,
                {},
                { withCredentials: true }
            );

            setMessage('Order cancelled successfully.');
            setSuccess(true);

            setOrders((prevOrders) =>
                prevOrders.filter((o) => o._id !== orderId)
            );

            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (err) {
            setMessage('Failed to cancel order. Try again.');
            setSuccess(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="bgColor">
            <h1 className="py-4 text-center title">Track Your Orders</h1>
            <div className="container">
                {orders.length === 0 ? (
                    <p className="text-center text-muted">No active orders.</p>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="card shadow-sm rounded-3 mb-5"
                        >
                            <div className="card-body m-4">
                                <h5 className="card-title mt-3">
                                    Order #{order._id}
                                </h5>
                                <p>
                                    <strong>Total:</strong> ₹{order.totalPrice}
                                </p>
                                <p>
                                    <strong>Delivery Address:</strong>{' '}
                                    {order.deliveryAddress}
                                </p>

                                <div
                                    className="progress mb-3"
                                    style={{ height: '30px' }}
                                >
                                    {steps.map((step, i) => {
                                        const isActive =
                                            steps.indexOf(order.status) >= i;
                                        return (
                                            <div
                                                key={i}
                                                className={`progress-bar ${
                                                    isActive
                                                        ? 'bg-success'
                                                        : 'bg-light text-dark'
                                                }`}
                                                style={{
                                                    width: `${
                                                        100 / steps.length
                                                    }%`,
                                                }}
                                            >
                                                {step}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div>
                                    <strong>Item:</strong>
                                    <ul>
                                        {order.items.map((item) => (
                                            <li key={item._id}>
                                                {item.food?.itemName} ×{' '}
                                                {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p>
                                    <strong>Current Status:</strong>{' '}
                                    {order.status}
                                </p>

                                {order.status !== 'Delivered' &&
                                    order.status !== 'Cancelled' && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                cancelOrder(order._id)
                                            }
                                        >
                                            Cancel Order
                                        </button>
                                    )}

                                {message && (
                                    <p
                                        className={`text-center ${
                                            success
                                                ? 'text-success'
                                                : 'text-danger'
                                        } `}
                                    >
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
