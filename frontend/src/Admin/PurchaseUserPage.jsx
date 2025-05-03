// filepath: d:\code\basicCrud\frontend\src\Admin\PurchaseUserPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const PurchaseUserPage = () => {
  const { courseId } = useParams();

  // Fetch course details or user details based on the courseId
  // For now, we'll use mock data
  const purchasedUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91-9876543210",
      purchaseDate: "2025-04-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91-8765432109",
      purchaseDate: "2025-04-22",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Purchased Users for Course ID: {courseId}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchasedUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.purchaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseUserPage;