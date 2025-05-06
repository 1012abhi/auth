import React from "react";
import { Link, useParams } from "react-router-dom";

const CohortCard = ({ _id, thumbnail, title, price, originalPrice, discount }) => {
  // const { id } = useParams(); // Get the course ID from the URL parameters
  // console.log(`CohortCard ID: ${id}`); // Log the course ID for debugging
  // console.log(`CohortCard ID: ${_id}`); // Log the course ID for debugging


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <img src={thumbnail} alt={thumbnail} className="w-full h-36 object-cover" />
      <div className="p-3">
        <h3 className="text-md font-semibold mb-1">{title}</h3>
        <div className="flex items-center gap-1 text-xs mb-4">
          <span className="text-black font-medium text-sm">₹{price}</span>
          <span className="line-through text-gray-500 text-xs">₹{originalPrice}</span>
          <span className="text-green-600 font-medium text-xs">{discount}% off</span>
        </div>
        <Link
          to={`/viewcourse/${_id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full px-26 py-2 rounded-2xl text-sm cursor-pointer transition duration-300 ease-in-out"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CohortCard;