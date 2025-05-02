import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/verifyemail/${token}`)
      .then((response) => {
        toast.success(response.data.message);
        setMessage(response.data.message);

        // Save token and user data to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        const user = response.data.user;
        if (user.role === 'admin') {
          setTimeout(() => navigate('/admin/dashboard'), 3000); // Redirect to admin dashboard after 3 seconds
        } else if (user.role === 'user') {
          setTimeout(() => navigate('/'), 3000); // Redirect to user's home page after 3 seconds
        } else {
          toast.error('Invalid role. Please contact support.');
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Verification failed');
        setMessage(error.response?.data?.message || 'Verification failed');
      });
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Email Verification</h2>
        <p className="text-center text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;