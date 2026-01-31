import React, { useState } from 'react';
import ProductList from './Product';
import { FaHeart } from 'react-icons/fa';

const Product = ({ searchQuery, addToCart, wishlistItems = [], addToWishlist, removeFromWishlist, }) => {
  const categories = ['All', 'Handicraft', 'Home Decor', 'Jewellery', 'Clothing', 'Home Utility'];

  const [activeTab, setActiveTab] = useState('All');

  // 🔍 Filter Logic (Category + Search Together)
  const filteredProducts = ProductList.filter(product => {
    const matchesCategory =
      activeTab === 'All' || product.category === activeTab;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderProducts = filteredProducts.map((product, index) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    const handleWishlistClick = () => {
      if (isInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    };

    return (
      <div
        key={index}
        className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
      >
        {/* Favorite button */}
      <button
  className="w-full mt-2 py-2 rounded-lg font-medium transition-all duration-300 active:scale-95 cursor-pointer"
  onClick={handleWishlistClick}
>
  <FaHeart className={`${isInWishlist ? 'text-red-600' : 'text-gray-400'} text-xl transition-colors`} />
</button>


        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Product Info */}
        <div className="text-center mt-2 p-4">
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-1">{product.category}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-gray-500 line-through">₹{product.oldPrice}</span>
            <span className="text-green-700 font-bold text-lg">₹{product.newPrice}</span>
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium 
                       hover:bg-green-700 transition-all duration-300 active:scale-95 cursor-pointer mt-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  });

  return (
    <section id="product-section" className="max-w-[1300px] mx-auto px-6 py-10">
      {/* Category Tabs */}
      <div className="flex gap-3 justify-center items-center relative border-b-2 border-gray-200 pb-2">
        {categories.map(category => (
          <button
            key={category}
            className={`relative px-6 py-2 text-lg font-medium transition-colors duration-300 ${
              activeTab === category
                ? 'text-green-600'
                : 'text-gray-600 hover:text-green-500'
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}

            {/* Magic Line */}
            {activeTab === category && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-green-600 rounded-full transition-all duration-300"></span>
            )}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 mb-20 text-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/7486/7486802.png" 
            alt="No results" 
            className="w-40 h-40 opacity-80"
          />

          <h2 className="text-2xl font-semibold text-gray-700 mt-6">
            No plants found 🌱
          </h2>

          <p className="text-gray-500 mt-2 text-lg">
            Try searching with a different keyword
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {renderProducts}
        </div>
      )}
    </section>
  );
};

export default Product;
