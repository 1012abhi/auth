import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, { 
      email,
      password,
      
    })
      .then(response => {
        // Handle successful signup (e.g., redirect to login page)
        toast.success('Signup successful! Please verify your email.');
        navigate('/verify-email'); // Navigate to the VerifyEmailPrompt page
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));

      })
      .catch(error => {
        // Handle signup error (e.g., show error message)
        toast.error(error.response?.data?.message || 'Signup failed!');
        console.error('Signup error:', error.response.data);
      });
      
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          
          <div className="flex items-center mb-6">
            <input
              required
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-indigo-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-indigo-500 hover:text-indigo-700">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
