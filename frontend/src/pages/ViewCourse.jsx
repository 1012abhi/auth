import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyButton from "../components/BuynowButton/BuyButton";

const ViewCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Make an API call to fetch course details
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/getcourse/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
          },
        });
        console.log("Course details fetched successfully:", response.data.data); // Log the fetched course details
        
        if (response.data.success) {
          setCourse(response.data.data); // Set the course data
        } else {
          alert("Failed to fetch course details.");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        alert("An error occurred while fetching course details.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading course details...</p>;
  }

  if (!course) {
    return <p className="text-center text-red-600">Course not found.</p>;
  }

  return (
    <>
      <div className="px-6 bg-blue-700 text-center">
        <div className="bg-white rounded-2xl p-1 shadow-md">
          <Navbar />
        </div>
        <div className="min-h-screen bg-blue-700 flex flex-col md:flex-row justify-center items-center p-6 gap-40">
          {/* Left side */}
          <div className="text-white max-w-lg space-y-6">
            <h1 className="text-4xl font-bold">{course.title}</h1>

            <div className="bg-white p-6 rounded-lg mt-8 text-blue-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-2">
                <p className="font-semibold">Description</p>
                <p className="text-gray-700">{course.description}</p>
                <p className="mt-4 font-semibold">
                  Starts: {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-96 mt-10 md:mt-0 md:ml-10">
            <img
              src={course.thumbnail || "https://via.placeholder.com/150"}
              alt={course.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">PRICE</p>
                  <p className="text-2xl font-bold">
                    ₹{course.price}{" "}
                    <span className="line-through text-gray-400 text-base ml-2">
                      ₹{course.originalPrice}
                    </span>
                  </p>
                </div>
                <div className="text-green-500 font-semibold text-lg">
                  {course.discount}% off
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 text-sm">Choose Currency:</label>
                <select className="border border-gray-300 p-2 rounded">
                  <option>INR</option>
                  {/* Add other currency options if needed */}
                </select>
              </div>
              <BuyButton  courseId={course._id} amount={course.price}/>
              {/* <button
                onClick={() => window.location.href = "/razorpay-payment"}
                className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out"
              >
                Buy Now
              </button> */}

              <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out">
                Pay via Crypto
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;