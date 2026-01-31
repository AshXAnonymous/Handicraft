import React, { useState, useEffect } from "react";
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";

const banners = [banner1, banner2, banner3];


const Banner = ({ScrolltoProducts}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[65vh] mt-[14vh] overflow-hidden rounded-xl shadow-lg">

      {/* Sliding Images */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Nursery Banner"
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Dark Overlay for Text */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 text-white">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Handmade Luxury for Everyday Living 🧵
        </h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md">
          Art You Can Own
        </p>
        <button onClick={ScrolltoProducts} className="
  mt-6 
  bg-[#8B5E34] 
  px-8 py-3 
  text-lg 
  rounded-full 
  font-semibold 
  text-[#F9F5F0]
  shadow-[0_4px_0_#6F4F28]
  hover:shadow-[0_6px_0_#6F4F28]
  hover:bg-[#7A512C]
  transition-all 
  tracking-wide
  border-2 border-[#D2B48C]
  hover:-translate-y-0.5
" >
  🧵 Shop Now
</button>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Banner;

