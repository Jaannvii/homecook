import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        const mergedCart = storedCart.reduce((acc, item) => {
            const existing = acc.find((i) => i._id === item._id);
            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                acc.push({ ...item, quantity: item.quantity || 1 });
            }
            return acc;
        }, []);

        setCart(mergedCart);
        calculateTotal(mergedCart);
        localStorage.setItem('cart', JSON.stringify(mergedCart));
    }, []);

    const calculateTotal = (items) => {
        const totalPrice = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(totalPrice);
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        setCart(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const proceedToCheckout = () => {
        localStorage.setItem('checkoutTotal', total);
        navigate('/checkout');
    };

    return (
        <div className="bgColor">
            <h1 className="text-center py-4 mb-2 title">Your Cart</h1>
            <div className="py-4 container bg-light rounded-3">
                {cart.length === 0 ? (
                    <p className="text-center text-muted">Your cart is empty</p>
                ) : (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item m-5 mb-4">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={
                                            item.imageUrl ||
                                            'https://images.unsplash.com/photo-1527943030836-ce2be96b5e5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFsbCUyMGZvb2R8ZW58MHwwfDB8fHww'
                                        }
                                        alt={item.itemName}
                                        className="rounded"
                                        style={{
                                            width: '300px',
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div className="ms-3 flex-grow-1">
                                        <h2 className="mb-1">
                                            {item.itemName}
                                        </h2>
                                        <p className="fw-bold mb-1">
                                            ₹{item.price}
                                        </p>

                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                    decreaseQuantity(index)
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                    increaseQuantity(index)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="price-details m-5 mt-4">
                            <hr />
                            <h4 className="fw-bold">Price Details</h4>
                            <div className="d-flex justify-content-between mt-2 pt-2">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button
                                className="btn btn-primary px-5"
                                onClick={proceedToCheckout}
                            >
                                PROCEED
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
