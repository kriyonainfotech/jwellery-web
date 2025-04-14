import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm leading-relaxed">
              Discover classy, minimal, and aesthetic jewelry designed for all occasions. Crafted with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm ps-0">
              <li><a href="/about" className="text-gray-800 hover:text-red-900 transition">About Us</a></li>
              <li><a href="/shop" className="text-gray-800 hover:text-red-900 transition">Shop</a></li>
              <li><a href="/contact" className="text-gray-800 hover:text-red-900 transition">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-800 hover:text-red-900 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm ps-0">
              <li>Email: <a href="mailto:support@materialgoods.com" className="text-gray-800 hover:text-red-900">support@materialgoods.com</a></li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: New York, USA</li>
            </ul>
          </div>

          {/* Social Media */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-xl text-gray-500">
              <a href="#" className="hover:text-blue-600 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-red-600 transition"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div> */}

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Material Goods. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
