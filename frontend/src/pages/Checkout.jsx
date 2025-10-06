import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedTotal = localStorage.getItem('checkoutTotal') || 0;
        setTotal(storedTotal);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
            } else {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            }
        });
    };

    const handlePlaceOrder = async () => {
        if (!form.name || !form.phone || !form.address) {
            setMessage('Please fill all details before placing order.');
            setSuccess(false);
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            setMessage('Razorpay SDK failed to load. Are you online?');
            setSuccess(false);
            return;
        }

        const finalAmount = parseInt(total) + 40;

        const options = {
            key: 'rzp_test_xJAgaJgdCkyu5H',
            amount: finalAmount * 100,
            currency: 'INR',
            name: 'Home Cook',
            description: 'Order Payment',
            handler: async function (response) {
                const cartItems =
                    JSON.parse(localStorage.getItem('cart')) || [];

                const orderPayload = {
                    items: cartItems.map((item) => ({
                        food: item._id,
                        quantity: item.quantity || 1,
                    })),
                    totalPrice: finalAmount,
                    deliveryAddress: form.address,
                    paymentMethod: 'Razorpay',
                };

                try {
                    const res = await fetch(
                        'https://homecook-dxhd.onrender.com/api/homecook/order/create',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify(orderPayload),
                        }
                    );

                    const data = await res.json();

                    if (res.ok) {
                        localStorage.removeItem('cart');
                        localStorage.removeItem('checkoutTotal');

                        setMessage('Payment Successful! Order Placed.');
                        setSuccess(true);

                        setTimeout(() => navigate('/'), 3000);
                    } else {
                        setMessage(
                            data.message || 'Failed to save order in database'
                        );
                        setSuccess(false);
                    }
                } catch (err) {
                    setMessage('Server error while saving order');
                    setSuccess(false);
                }
            },
            prefill: {
                name: form.name,
                email: 'customer@example.com',
                contact: form.phone,
            },
            theme: {
                color: '#ffe0bd',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="bgColor">
            <h1 className="text-center py-4 title">Checkout</h1>

            <div
                className="container py-4 bg-light rounded-3"
                style={{ maxWidth: '700px' }}
            >
                <div className="cart-item m-4">
                    <h3 className="fw-bold mb-4">Delivery Details</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control mb-3"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control mb-3"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        name="address"
                        placeholder="Delivery Address"
                        className="form-control mb-4"
                        value={form.address}
                        onChange={handleChange}
                    ></textarea>

                    <div className=" bg-white">
                        <h5 className="fw-bold">Order Summary</h5>
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Delivery Fee</span>
                            <span>₹40</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>₹{parseInt(total) + 40}</span>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary px-5"
                            onClick={handlePlaceOrder}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
                {message && (
                    <p
                        className={`text-center ${
                            success ? 'text-success' : 'text-danger'
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
