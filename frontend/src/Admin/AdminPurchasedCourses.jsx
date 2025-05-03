import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminPurchasedCourses = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [purchasedCourses, setPurchasedCourses] = useState([
    {
      id: 1,
      courseTitle: "Complete Web Development",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      userPhone: "+91-9876543210",
      purchaseDate: "2025-04-20",
      price: 5999,
      sellQuantity: 120,
      description: "Learn full-stack web development from scratch.",
    },
    {
      id: 2,
      courseTitle: "Blockchain Basics",
      userName: "Jane Smith",
      userEmail: "jane.smith@example.com",
      userPhone: "+91-8765432109",
      purchaseDate: "2025-04-22",
      price: 4999,
      sellQuantity: 80,
      description: "Understand the fundamentals of blockchain technology.",
    },
    {
      id: 3,
      courseTitle: "React for Beginners",
      userName: "Alice Johnson",
      userEmail: "alice.johnson@example.com",
      userPhone: "+91-7654321098",
      purchaseDate: "2025-04-25",
      price: 3999,
      sellQuantity: 150,
      description: "Learn the basics of React and build real-world apps.",
    },
  ]);

  const statusColor = {
    "Complete Web Development": "bg-blue-500",
    "Blockchain Basics": "bg-green-500",
    "React for Beginners": "bg-yellow-500",
  };

  const handleCardClick = (courseId) => {
    // Navigate to the Purchase User Page with the course ID
    navigate(`/admin/purchased-courses/${courseId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Purchased Courses</h1>

      {/* Search and Actions */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search here..."
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
        <div className="flex space-x-4">
          <button className="bg-teal-500 text-white px-4 py-2 rounded">Add Course</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Clear</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Course Title</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Sell Quantity</th>
              <th className="px-4 py-2 text-left">Course Launch Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {purchasedCourses.map((course, idx) => (
              <tr
                key={idx}
                onClick={() => handleCardClick(course.id)} // Attach onClick handler
                className="border-t border-gray-200 cursor-pointer hover:bg-gray-100"
              >
                <td className="px-4 py-2">
                  <span
                    className={`text-white px-3 py-1 rounded6 text-sm ${statusColor[course.courseTitle]}`}
                  >
                    {course.courseTitle}
                  </span>
                </td>
                <td className="px-4 py-2">₹{course.price}</td>
                <td className="px-4 py-2">{course.sellQuantity}</td>
                <td className="px-4 py-2">30-04-2002</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">✏️</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPurchasedCourses;
// const handleCardClick = (courseId) => {
//   // Navigate to the Purchase User Page with the course ID
//   navigate(`/admin/purchased-courses/${courseId}`);
// };

// return (
//   <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
//     <h1 className="text-3xl font-bold mb-6 text-center">Manage Purchased Courses</h1>

//     {/* Course Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {purchasedCourses.map((course) => (
//         <div
//           key={course.id}
//           className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all"
//           onClick={() => handleCardClick(course.id)}
//         >
//           <h2 className="text-xl font-semibold mb-2">{course.courseTitle}</h2>
//           <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
//           <p className="text-gray-600 mb-2">Sell Quantity: {course.sellQuantity}</p>
//           <p className="text-sm text-gray-500">Purchase Date: {course.purchaseDate}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );