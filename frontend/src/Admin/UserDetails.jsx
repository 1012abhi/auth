import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = ({ purchasedCourses }) => {
  const { userId } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  // Filter courses purchased by the selected user
  const userCourses = purchasedCourses.filter((course) => course.userId === parseInt(userId));

  if (userCourses.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>
        <p className="text-center text-gray-600">No courses found for this user.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { userName, userEmail, userPhone } = userCourses[0]; // Get user details from the first course

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p className="text-gray-600">
          <strong>Name:</strong> {userName}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {userEmail}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {userPhone}
        </p>
        <p className="text-gray-600">
          <strong>Total Courses Purchased:</strong> {userCourses.length}
        </p>
      </div>

      {/* Purchased Courses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Purchased Courses</h2>
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Course Title</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {userCourses.map((course) => (
              <tr key={course.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{course.courseTitle}</td>
                <td className="px-4 py-2">₹{course.price}</td>
                <td className="px-4 py-2">{course.purchaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserDetails;