import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

import Navbar from '../components/Navbar.jsx';

const MainPage = () => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchMenus = async () => {
        try {
            const res = await axios.get(`${API_URL}/menu/`);
            const items = res.data.menus || [];
            setMenus(items);

            const uniqueCategories = [
                ...new Set(items.map((item) => item.category)),
            ];
            setCategories(uniqueCategories);
            if (uniqueCategories.length > 0) {
                setSelectedCategory(uniqueCategories[0]);
            }
        } catch (err) {
            console.error('Error fetching menus:', err);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

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
                        Explore Menu
                    </h2>
                    <div className="row">
                        {categories.length > 0 ? (
                            categories.map((cat, index) => (
                                <div className="col-md-3 mb-4" key={index}>
                                    <div className="card category-card shadow h-100 text-center">
                                        <img
                                            src={
                                                cat.toLowerCase() ===
                                                'breakfast'
                                                    ? 'https://plus.unsplash.com/premium_photo-1663013644564-f34ba6d12144?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJyZWFrZmFzdHxlbnwwfDB8MHx8fDA%3D'
                                                    : cat.toLowerCase() ===
                                                      'lunch'
                                                    ? 'https://media.istockphoto.com/id/996699224/photo/assorted-indian-food-for-lunch-or-dinner-rice-lentils-paneer-dal-makhani-naan-chutney-spices.webp?a=1&b=1&s=612x612&w=0&k=20&c=6lKwTIL3fM312lY8g_gN2gn-H5dp0lnuxtn2tjc0U2s='
                                                    : cat.toLowerCase() ===
                                                      'dinner'
                                                    ? 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRpbm5lcnxlbnwwfDB8MHx8fDA%3D'
                                                    : cat.toLowerCase() ===
                                                      'snacks'
                                                    ? 'https://plus.unsplash.com/premium_photo-1687870052289-c2396780bc0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNuYWNrc3xlbnwwfDB8MHx8fDA%3D'
                                                    : cat.toLowerCase() ===
                                                      'dessert'
                                                    ? 'https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGRlc3NlcnR8ZW58MHwwfDB8fHww'
                                                    : cat.toLowerCase() ===
                                                      'beverages'
                                                    ? 'https://images.unsplash.com/photo-1659667630207-ab806cd5cc6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJldmVyYWdlc3xlbnwwfDB8MHx8fDA%3D'
                                                    : 'https://images.unsplash.com/photo-1527943030836-ce2be96b5e5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFsbCUyMGZvb2R8ZW58MHwwfDB8fHww'
                                            }
                                            className="card-img-top"
                                            alt={cat}
                                        />
                                        <div className="card-body">
                                            <h5 className="title">{cat}</h5>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() =>
                                                    navigate(
                                                        `/menu?category=${cat}`
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
                                No menu found.
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
