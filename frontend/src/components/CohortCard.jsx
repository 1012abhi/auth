// src/components/CohortCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CohortCard = ({ image, title, price, originalPrice, discount }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm mb-8">
          <span className="text-black font-medium text-lg">₹{price}</span>
          <span className="line-through text-gray-500">₹{originalPrice}</span>
          <span className="text-green-600 font-medium">{discount}% off</span>
        </div>
        <Link to="/viewcourse" className="bg-blue-500 hover:bg-blue-600 text-white w-full px-32 py-2 rounded-md cursor-pointer transition duration-300 ease-in-out">View Details</Link>
      </div>
    </div>
  );
};

export default CohortCard;
