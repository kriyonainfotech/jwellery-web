import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="container pt-10 pb-0">
        <div className="row py-5">

          <div className="col-3">
            {/* Column 1 */}
            <div className="footer-column">
              <h4 className="footer-heading montserrat text-gray-800 mb-4">About Us</h4>
              <p className="footer-text montserrat pe-16">
                Discover classy, minimal, and aesthetic jewelry designed for all occasions. Crafted with passion and precision.
              </p>
            </div>
          </div>

          <div className="col-3">
            {/* Column 2 */}
            <div className="footer-column">
              <h4 className="footer-heading montserrat text-gray-800 mb-4">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="/about" className="footer-link montserrat">About Us</a>
                </li>
                <li>
                  <a href="/shop" className="footer-link montserrat">Shop</a>
                </li>
                <li>
                  <a href="/contact" className="footer-link montserrat">Contact Us</a>
                </li>
                <li>
                  <a href="/faq" className="footer-link montserrat">FAQ</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-3">
            {/* Column 3 */}
            <div className="footer-column">
              <h4 className="footer-heading montserrat text-gray-800 mb-4">Contact</h4>
              <p className="footer-text montserrat">Email: support@materialgoods.com</p>
              <p className="footer-text montserrat">Phone: +1 234 567 890</p>
              <p className="footer-text montserrat">Location: New York, USA</p>
            </div>
          </div>

          <div className="col-3">
            {/* Column 4 */}
            <div className="footer-column">
              <h4 className="footer-heading montserrat text-gray-800 mb-4">Follow Us</h4>
              <div className="footer-socials">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom mt-0">
          <p className="montserrat text-center text-sm mb-0 py-3">&copy; 2024 Material Goods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
