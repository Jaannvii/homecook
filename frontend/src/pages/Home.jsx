import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/Navbar.jsx';

const MainPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_URL}/meal/categories`);
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories. Please try again later.');
            }
            setLoading(false);
        };
        fetchCategories();
    }, [API_URL]);

    return (
        <div className="bg-light">
            <Navbar />

            <section className="hero-section text-center d-flex align-items-center">
                <div className="container">
                    <h1 className="display-4 fw-bold text-dark mb-3">
                        Fresh Home-Cooked Meals, Delivered to You
                    </h1>
                    <p className="lead text-muted mb-4">
                        Enjoy delicious homemade food from local chefs near you.
                    </p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/auth/register')}
                    >
                        Order Now
                    </button>
                </div>
            </section>

            <section id="categories" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">
                        Explore Meal Categories
                    </h2>
                    <div className="row">
                        {loading ? (
                            <div className="text-center text-muted">
                                Loading categories...
                            </div>
                        ) : error ? (
                            <div className="text-center text-danger">
                                {error}
                            </div>
                        ) : categories.length > 0 ? (
                            categories.map((cat) => (
                                <div className="col-md-3 mb-4" key={cat._id}>
                                    <div className="card shadow h-100">
                                        <img
                                            src={cat.categoryImage}
                                            className="card-img-top"
                                            alt={cat.categoryName}
                                        />
                                        <div className="card-body text-center">
                                            <h5>{cat.categoryName}</h5>
                                            <button
                                                className="btn btn-outline-primary btn-sm mt-2"
                                                onClick={() =>
                                                    navigate(
                                                        `/meals?category=${cat._id}`
                                                    )
                                                }
                                            >
                                                View Meals
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-muted">
                                No categories found.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="about" className="py-5 bg-white">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">About Us</h2>
                    <p className="mb-2">
                        Our platform connects food lovers with talented home
                        chefs.
                    </p>
                    <p className="mb-5">
                        Get wholesome, homemade meals delivered to your doorstep
                        with ease.
                    </p>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5>🍲 Homemade Goodness</h5>
                                    <p className="mb-0">
                                        Authentic recipes made fresh in home
                                        kitchens.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5>🚚 Quick Delivery</h5>
                                    <p className="mb-0">
                                        Get your meal hot and fresh, right on
                                        time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5>✅ Trusted Chefs</h5>
                                    <p className="mb-0">
                                        Verified home chefs ensure hygiene &
                                        taste.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-3">Contact Us</h2>
                    <p>Email: support@homecook.com | Phone: +91 9876543210</p>
                </div>
            </section>

            <footer className="bg-dark text-white text-center py-3">
                &copy; {new Date().getFullYear()} HomeCook. All Rights Reserved.
            </footer>
        </div>
    );
};

export default MainPage;
