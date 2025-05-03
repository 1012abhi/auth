import React from "react";
import { useParams } from "react-router-dom";
import UserTable from "./UserTable";

const PurchaseUserPage = () => {
  const { courseId } = useParams();

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

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Purchase Date", key: "purchaseDate" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Purchased Users for Course ID: {courseId}
      </h1>
      <UserTable users={purchasedUsers} columns={columns} />
    </div>
  );
};

export default PurchaseUserPage;