import React, { useState, useEffect } from "react";
import axios from "axios";

const statusColor = {
  user: "bg-yellow-500",
  admin: "bg-blue-500",
  online: "bg-green-500",
  offline: "bg-red-500",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from the backend
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getallusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        alert("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const handleUpdateUser = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/updateuser/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("User updated successfully.");
        fetchAllUsers(); // Refresh the user list
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert("User deleted successfully.");
        fetchAllUsers(); // Refresh the user list
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search here..."
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
        <div className="flex space-x-4">
          <button className="bg-teal-500 text-white px-4 py-2 rounded">Add User</button>
          <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Clear</button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Avatar</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">User Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    <img
                      src={
                        user.profilePicture ||
                        "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">{user.name || "N/A"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-white px-3 py-1 rounded text-sm ${statusColor[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.phone || "N/A"}</td>
                  <td className="px-4 py-2">
                    {user.isVerified ? (
                      <span className="text-green-500 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-white px-3 py-1 rounded text-sm ${statusColor[user.status]}`}
                    >
                      {user.status || "offline"}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleUpdateUser(user._id, {
                          name: "Updated Name",
                          email: "updated.email@example.com",
                          role: "user",
                        })
                      }
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}