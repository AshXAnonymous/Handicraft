import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Product from "../Products/Product.jsx";
import Footer from "../Footer/Footer";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import Checkout from "../Checkout/Checkout.jsx";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Scroll to Products
  const ScrolltoProducts = () => {
    const section = document.getElementById("product-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // Add to Cart
  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Remove from wishlist if added from wishlist
    setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // Update Cart Item Quantity
  const updateQuantity = (id, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // Remove from Cart
  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Remove from Wishlist
  const removeWishlistItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  // Checkout
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };
const placeOrder = (data) => {
  console.log("ORDER DATA RECEIVED:", data); // this should appear in console
  console.log("CART ITEMS:", cartItems);     // also log cart items
  alert("Order placed! Check console for details.");
};


  return (
    <div>
      <Navbar
        ScrolltoProducts={ScrolltoProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
      />

      <Banner      ScrolltoProducts={ScrolltoProducts}/>

      <Product
        searchQuery={searchQuery}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlistItems={wishlistItems}
      />

      <Footer />

      {/* Cart */}
      {isCartOpen && (
        <Cart
          closeCart={() => setIsCartOpen(false)}
          cartItems={cartItems}
             ScrolltoProducts={ScrolltoProducts}
          updateQuantity={updateQuantity}
          removeItem={removeCartItem}
          title="Your Cart"
          openCheckout={openCheckout}
        />
      )}

      {/* Wishlist */}
      {isWishlistOpen && (
        <Wishlist
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          closeWishlist={() => setIsWishlistOpen(false)}
          removeItem={removeWishlistItem}
        />
      )}

      {/* Checkout */}
      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          closeCheckout={closeCheckout}
          placeOrder={placeOrder}
        />
      )}
    </div>
  );
};

export default Home;
