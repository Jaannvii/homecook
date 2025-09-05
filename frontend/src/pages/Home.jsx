import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

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
        <div className="bgColor">
            <Navbar />

            <section className="hero-section text-center d-flex align-items-center">
                <div className="container">
                    <h1 className="title display-4 fw-bold text-shadow">
                        Fresh Home-Cooked Meals, Delivered to You
                    </h1>
                    <p className="lead mt-3 text-shadow title">
                        Enjoy delicious homemade food from local chefs near you.
                    </p>
                </div>
            </section>

            <section id="meal" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold title">
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
                                    <div className="card category-card shadow h-100">
                                        <img
                                            src={cat.categoryImage}
                                            className="card-img-top"
                                            alt={cat.categoryName}
                                        />
                                        <div className="card-body text-center">
                                            <h5 className="title">
                                                {cat.categoryName}
                                            </h5>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
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

            <section id="about" className="py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-3 title">About Us</h2>
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
                                    <h5 className="title">
                                        🍲 Homemade Goodness
                                    </h5>
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
                                    <h5 className="title">🚚 Quick Delivery</h5>
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
                                    <h5 className="title">✅ Trusted Chefs</h5>
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
                    <h2 className="fw-bold mb-3 title">Contact Us</h2>
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
