import { useState } from 'react';
import { register } from '../services/authService.js';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            console.log('Response:', res);
            if (res.data.message && res.data) {
                setMessage(res.data.message);
                setSuccess(true);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setMessage(err.response?.data?.message || 'Registration failed');
            setSuccess(false);
        }
    };

    return (
        <div className="container-fluid auth-bg d-flex justify-content-center align-items-center min-vh-100">
            <div
                className="card shadow auth-card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <h2 className="text-center mb-4 auth-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            name="role"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="User">User</option>
                            <option value="Chef">Chef</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 mb-2"
                    >
                        Register
                    </button>
                    <div className="text-center">
                        <Link to="/auth/login" className="custom-link">
                            Already have an account? Login
                        </Link>
                    </div>
                    {message && (
                        <p
                            className={`text-center ${
                                success ? 'text-success' : 'text-danger'
                            } mt-3`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};
export default Register;
