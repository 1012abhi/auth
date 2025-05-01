import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/user/admin/updateuser/${userId}`, { email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        toast.success('User updated successfully and email sent!');
        setUserId('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Failed to update user');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out text-white py-2 rounded-lg"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;