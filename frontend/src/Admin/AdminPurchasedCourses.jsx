import React, { useState } from "react";

const AdminPurchasedCourses = () => {
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

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Purchased Courses</h1>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleCardClick(course)}
          >
            <h2 className="text-xl font-semibold mb-2">{course.courseTitle}</h2>
            <p className="text-gray-600 mb-2">Price: ₹{course.price}</p>
            <p className="text-gray-600 mb-2">Sell Quantity: {course.sellQuantity}</p>
            <p className="text-sm text-gray-500">Purchase Date: {course.purchaseDate}</p>
          </div>
        ))}
      </div>

      {/* Modal for Course Details */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{selectedCourse.courseTitle}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Description:</strong> {selectedCourse.description}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong> ₹{selectedCourse.price}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Sell Quantity:</strong> {selectedCourse.sellQuantity}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Purchase Date:</strong> {selectedCourse.purchaseDate}
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">User Details</h3>
            <p className="text-gray-600 mb-2">
              <strong>Name:</strong> {selectedCourse.userName}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {selectedCourse.userEmail}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> {selectedCourse.userPhone}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPurchasedCourses;