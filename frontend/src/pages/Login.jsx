import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      email,
      password,
      rememberMe,
    })  
    .then((response) => {
      // Handle successful login (e.g., store token, redirect user)
      console.log('Login successful:', response.data);
      toast.success('Login successful!');
      localStorage.setItem('token', response.data.token); // Store token in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
      // Redirect to the dashboard or home page
      navigate('/')
    }) 
    .catch((error) => {
      // Handle login error (e.g., show error message)
      toast.error(error.response?.data?.message || 'Login failed!');
      console.error('Login error:', error.response.data);
    }); 


    // Handle form submission (e.g., authentication logic)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className=" text-2xl font-semibold text-center text-gray-800 mb-6 ">Login</h2>
        
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
          
          <div className="mb-6">
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
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <Link to="/forgotpassword" className="text-sm text-indigo-500 hover:text-indigo-700">Forgot password?</Link>
            {/* <a href="#" className="text-sm text-indigo-500 hover:text-indigo-700">Forgot password?</a> */}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-700 ">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
