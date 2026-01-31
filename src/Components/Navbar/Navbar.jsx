import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

const Navbar = ({
  ScrolltoProducts,
  searchQuery,
  setSearchQuery,
  openCart,
  openWishlist,
  cartItems = [],
  wishlistItems = [],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg backdrop-blur-lg"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-[1300px] mx-auto px-6 h-[14vh] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-26 h-26 object-contain hover:scale-105 transition-all duration-200"
          />
        </a>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-10 relative">
          <input
            type="text"
            placeholder="Search handcrafted decor, clothing , jewellery....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={ScrolltoProducts}
            className="w-full py-3 pl-5 pr-12 border border-gray-300 rounded-full 
                       text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                       outline-none bg-gray-50"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-600 
                             rounded-full flex items-center justify-center hover:bg-green-700 transition">
            <IoSearch className="text-white text-xl" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-x-6 text-2xl text-gray-700">
          {/* Wishlist */}
          <button
            onClick={openWishlist}
            className="relative hover:text-green-600 transition-colors"
          >
            <FaHeart />
            <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs px-2 py-[2px] rounded-full">
              {wishlistItems?.length || 0}
            </span>
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative hover:text-green-600 transition-colors"
          >
            <IoBagHandleSharp />
            <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs px-2 py-[2px] rounded-full">
              {cartItems?.length || 0}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
