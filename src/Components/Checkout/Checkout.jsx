import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Checkout = ({ cartItems, closeCheckout, placeOrder }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" })); // remove error on input
    setFormData({ ...formData, [name]: value });
  };

  // -----------------------
  // VALIDATION FUNCTION
  // -----------------------
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    if (!formData.house.trim()) newErrors.house = "House / Building is required.";
    if (!formData.area.trim()) newErrors.area = "Area / Road Name is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------
  // SEND ORDER TO WHATSAPP
  // -----------------------
  const sendOrderToWhatsApp = () => {
    const phoneNumber = "8920635270"; // <- Replace with your WhatsApp number

    const customerDetails = `
Name: ${formData.name}
Phone: ${formData.phone}

Address:
${formData.house}, ${formData.area}
${formData.landmark ? formData.landmark + "," : ""}
${formData.city}, ${formData.state} - ${formData.pincode}
`;

    // Order items
    const itemsText = cartItems
      .map(
        (item) =>
          `${item.title || item.name} (x${item.quantity}) - ₹${
            item.newPrice * item.quantity
          }`
      )
      .join("\n");

    const finalMessage = `🛒 *New Order Received*

📌 *Customer Details*
${customerDetails}

📦 *Order Items*
${itemsText}

💰 *Total Amount:* ₹${totalAmount}
`;

    const encodedMessage = encodeURIComponent(finalMessage);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  // -----------------------
  // PLACE ORDER
  // -----------------------
  const onPlaceOrder = () => {
    if (!validateForm()) return; // Stop if validation fails

    placeOrder(formData); // Send data to parent
    sendOrderToWhatsApp(); // Open WhatsApp with order
    alert("Order placed successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-[480px] max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          <button onClick={closeCheckout} className="text-3xl text-gray-600 hover:text-red-600">
            <IoClose />
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
          <p className="text-gray-700 font-medium">Total Items: {cartItems.length}</p>
          <p className="text-gray-900 font-bold text-xl mt-1">
            Total Amount: <span className="text-green-600">₹{totalAmount}</span>
          </p>
        </div>

        {/* PERSONAL DETAILS */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Details</h3>
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="text"
            name="phone"
            maxLength="10"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <hr className="my-5" />

        {/* ADDRESS DETAILS */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Address</h3>
        <div className="space-y-3">
          <input
            type="text"
            name="house"
            placeholder="House No., Building"
            value={formData.house}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />
          {errors.house && <p className="text-red-500 text-sm">{errors.house}</p>}

          <input
            type="text"
            name="area"
            placeholder="Road Name, Area, Colony"
            value={formData.area}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}

          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />

          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>

          <input
            type="text"
            name="pincode"
            maxLength="6"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 ring-green-500"
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
        </div>

        <hr className="my-6" />

        {/* PAYMENT */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
        <div className="bg-gray-100 p-4 rounded-lg border">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" defaultChecked className="scale-125" />
            <span className="text-gray-700 font-medium">Cash on Delivery (COD)</span>
          </label>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button
          onClick={onPlaceOrder}
          className="mt-6 w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition font-semibold active:scale-95"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
