import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MealsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await axios.get(`${API_URL}/menu/`);
                let items = res.data.menus || [];

                if (category) {
                    items = items.filter(
                        (item) =>
                            item.category &&
                            item.category.toLowerCase() ===
                                category.toLowerCase()
                    );
                }
                setMeals(items);
            } catch (err) {
                console.error('Error fetching meals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [category]);

    const handleAddToCart = (meal) => {
        if (isLoggedIn) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(meal);
            localStorage.setItem('cart', JSON.stringify(cart));
            setMessage(`${meal.itemName} added to cart ✅`);
            setTimeout(() => navigate('/cart'), 3000);
        } else {
            setMessage(
                'Please register to add items to your cart. Redirecting to the registration page...'
            );
            setTimeout(() => {
                navigate('/auth/register');
            }, 5000);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading meals...</p>;

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 fw-bold">
                {category ? `${category} Menu` : 'All Menu'}
            </h2>
            <div className="row">
                {meals.length > 0 ? (
                    meals.map((meal) => (
                        <div className="col-md-4 mb-4" key={meal._id}>
                            <div className="card shadow h-100">
                                <img
                                    src={
                                        meal.imageUrl ||
                                        'https://images.unsplash.com/photo-1527943030836-ce2be96b5e5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFsbCUyMGZvb2R8ZW58MHwwfDB8fHww'
                                    }
                                    className="card-img-top"
                                    alt={meal.itemName}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {meal.itemName}
                                    </h5>
                                    <p className="card-text">
                                        {meal.description}
                                    </p>
                                    <p className="fw-bold">₹{meal.price}</p>
                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={() => handleAddToCart(meal)}
                                    >
                                        Add to Cart
                                    </button>
                                    {message && (
                                        <div className="alert alert-info text-center">
                                            {message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">
                        No meals found in this category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MealsPage;
