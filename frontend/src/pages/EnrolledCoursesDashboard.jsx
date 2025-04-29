// src/components/EnrolledCoursesDashboard.jsx
import React from "react";
// import enrolledCourses from "../data/enrolledCourses";

const EnrolledCoursesDashboard = () => {

    // src/data/enrolledCourses.js
    const enrolledCourses = [
        {
        id: 1,
        title: "React for Beginners",
        description: "Learn the basics of React and build real-world apps.",
        enrollDate: "2025-04-20",
        price: "₹499",
        },
        {
        id: 2,
        title: "Node.js with Express",
        description: "Master backend development with Node.js.",
        enrollDate: "2025-04-22",
        price: "₹699",
        },
    ];
  
//   export default enrolledCourses;
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500">Enrolled on: {course.enrollDate}</p>
            <p className="font-medium mt-2">Price: {course.price}</p>
            <button className="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              View Material
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesDashboard;
