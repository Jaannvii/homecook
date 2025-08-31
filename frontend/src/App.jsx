import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🔹 Components
import Navbar from "./components/Navbar";

import MenuCard from "./components/MenuCard";

// 🔹 Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import ChefDashboard from "./pages/Dashboards/ChefDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import UserDashboard from "./pages/Dashboards/UserDashboard";


// 🔹 Context
import { useAuth } from "./context/AuthContext";

// ================= Protected Route Component =================
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ================= Main App Component =================
const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container my-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          

          {/* Protected Routes */}
          <Route
            path="/chef-dashboard"
            element={
              <ProtectedRoute allowedRoles={["chef"]}>
                <ChefDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Not Found Page */}
          <Route path="*" element={<h2 className="text-center">404 - Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
