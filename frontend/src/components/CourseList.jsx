import React, { useEffect, useState } from "react";
import CohortCard from "./CohortCard";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const [loading, setLoading] = useState(true); // State to handle loading
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 8; // Number of items per page

  // Fetch all courses from the backend
  const fetchAllCourses = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/getallcourses`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.data.success) {
        console.log("Courses fetched successfully:", response.data.data); // Log the fetched courses
        setCourses(response.data.data); // Update the courses state with the fetched data
      } else {
        alert("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("An error occurred while fetching courses.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Available Cohorts</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading courses...</p>
      ) : courses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {currentCourses.map((course, idx) => (
              <CohortCard key={idx} {...course} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-full ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                } hover:bg-blue-600 transition duration-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;