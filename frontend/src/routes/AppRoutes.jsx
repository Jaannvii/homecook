import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import MainPage from '../pages/Home.jsx';
import AdminDashboard from '../pages/Dashboards/AdminDashboard.jsx';
import ChefDashboard from '../pages/Dashboards/ChefDashboard.jsx';
import Cart from '../pages/Cart.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/chef/dashboard" element={<ChefDashboard />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    );
};

export default AppRoutes;
