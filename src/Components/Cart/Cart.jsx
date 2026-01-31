import React from "react";
import { IoClose } from "react-icons/io5";

const Cart = ({ closeCart, cartItems = [], updateQuantity, removeItem,openCheckout }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex justify-end">
      <div className="w-[380px] h-full bg-white shadow-2xl flex flex-col animate-slide-left">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <button onClick={closeCart} className="text-2xl text-gray-600 hover:text-red-500 transition">
            <IoClose />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-600 font-bold">₹{item.newPrice}</span>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t px-5 py-4 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal}</span>
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition-all duration-300 active:scale-95 disabled:opacity-50"
            disabled={cartItems.length === 0}  onClick={openCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
