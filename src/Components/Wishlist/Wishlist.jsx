import React from "react";
import { IoClose } from "react-icons/io5";

const Wishlist = ({ wishlistItems = [], closeWishlist, removeItem, addToCart }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex justify-end">
            <div className="w-[380px] h-full bg-white shadow-2xl animate-slide-left flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">Your Wishlist</h2>
                    <button
                        onClick={closeWishlist}
                        className="text-2xl text-gray-600 hover:text-red-500 transition-colors"
                    >
                        <IoClose />
                    </button>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {wishlistItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10 text-lg">
                            Your wishlist is empty 🖤
                        </p>
                    ) : (
                        wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-gray-800 font-semibold text-lg">{item.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                                    <span className="text-green-600 font-bold mt-2 block text-lg">
                                        ₹{item.newPrice}
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 font-medium hover:text-red-600 transition-colors text-sm"
                                >
                                    Remove
                                </button>
                                <button
                                     className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg 
             hover:bg-green-700 transition active:scale-95 cursor-pointer"
                                    onClick={() => {
                                        addToCart(item);
                                        removeItem(item.id);
                                    }}
                                >
                                    Add to Cart
                                </button>


                            </div>

                        ))
                    )}
                </div>

                {/* Footer (Optional, could be used for total or checkout) */}
                {wishlistItems.length > 0 && (
                    <div className="border-t px-6 py-4 flex justify-end">
                        <button
                            onClick={closeWishlist}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Close Wishlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
