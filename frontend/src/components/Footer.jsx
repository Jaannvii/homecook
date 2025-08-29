import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
                <div className="row">

                    {/* Brand Info */}
                    <div className="col-md-4">
                        <h5>HomeCook</h5>
                        <p>
                            Fresh homemade meals delivered straight to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link className="text-light" to="/">Home</Link></li>
                            <li><Link className="text-light" to="/menu">Menu</Link></li>
                            <li><Link className="text-light" to="/cart">Cart</Link></li>
                            <li><Link className="text-light" to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>📞 +91 9368743625</p>
                        <p>✉️ support@homecook.com</p>
                        <p>🏠 New Delhi, India</p>
                    </div>
                </div>

                <hr className="bg-light" />
                <div className="text-center">
                    © {new Date().getFullYear()} HomeCook. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
