import { useState } from 'react';
import { login } from '../services/authService.js';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(formData);
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            alert(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Welcome Back
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-semibold ${
                        loading
                            ? 'bg-green-400'
                            : 'bg-green-600 hover:bg-green-700'
                    } transition`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/auth/register"
                        className="text-green-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
