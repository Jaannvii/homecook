import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    HomeCook
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {user && (
                            <>
                                <li className="nav-item me-3">
                                    <Link className="nav-link" to="/cart">
                                        <i className="bi bi-cart"></i>
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle"
                                        id="profileDropdown"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-person-circle"></i>{' '}
                                        {user.name}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {user.role === 'admin' && (
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/admin-dashboard"
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        {user.role === 'chef' && (
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/chef-dashboard"
                                                >
                                                    Chef Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        {user.role === 'user' && (
                                            <>
                                                <li>
                                                    <Link
                                                        className="dropdown-item"
                                                        to="/history"
                                                    >
                                                        Past History
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="dropdown-item"
                                                        to="/tracking"
                                                    >
                                                        Order Tracking
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
