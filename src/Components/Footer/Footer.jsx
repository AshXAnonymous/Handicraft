import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0e1a12] text-gray-300 pt-14 pb-6 mt-12">
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">J.K. Enterprises</h2>
          <p className="text-gray-400 leading-relaxed">
            Enriching your houses , yourselves with a warmth of hands that has curated the finest products for your comforts and lavishness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Shop</li>
            <li className="hover:text-green-400 cursor-pointer">Blogs</li>
            <li className="hover:text-green-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-400 cursor-pointer">FAQs</li>
            <li className="hover:text-green-400 cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-green-400 cursor-pointer">Order Tracking</li>
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a className="hover:text-green-400 cursor-pointer"><FaFacebookF /></a>
            <a className="hover:text-green-400 cursor-pointer"><FaInstagram /></a>
            <a className="hover:text-green-400 cursor-pointer"><FaTwitter /></a>
            <a className="hover:text-green-400 cursor-pointer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400">
        © {new Date().getFullYear()} Handicrafts for you!. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
