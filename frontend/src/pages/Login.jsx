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

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/user/auth/google`;
  }
  
  // const handleGoogleLogin = () => {
  //   // Handle Google login logic here (e.g., redirect to Google OAuth)
  //   axios.get(`http://localhost:5173/api/user/auth/google`)
  //   .then((response) => {
  //     // Handle successful Google login (e.g., store token, redirect user)
  //     console.log('Google login successful:', response.data);
  //     toast.success('Google login successful!');
  //     localStorage.setItem('token', response.data.token); // Store token in local storage
  //     localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
  //     // Redirect to the dashboard or home page
  //     navigate('/')
  //   })
  //   .catch((error) => {
  //     // Handle Google login error (e.g., show error message)
  //     toast.error(error.response?.data?.message || 'Google login failed!');
  //     console.error('Google login error:', error.response.data);
  //   });
  // }

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
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <a
          onClick={() => {handleGoogleLogin()}}
          // href={`${import.meta.env.VITE_BASE_URL}/user/auth/google`}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-17.7-1.6-34.7-4.6-51.1H272v96.8h146.9c-6.3 34.1-25 62.8-53.3 82.1l86.2 66.9c50.2-46.2 81.7-114.3 81.7-194.7z"/>
            <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24.1 178.1-65.2l-86.2-66.9c-24 16.1-54.7 25.6-91.9 25.6-70.6 0-130.5-47.7-151.9-111.6H30.1v69.9c44.5 88.1 136.5 148.2 241.9 148.2z"/>
            <path fill="#FBBC05" d="M120.1 326.2c-10.4-30.8-10.4-63.6 0-94.4V161.9H30.1c-43.9 88.2-43.9 192.3 0 280.5l90-69.9z"/>
            <path fill="#EA4335" d="M272 107.2c39.6-.6 77.7 14.4 106.5 41.7l79.6-79.6C406.4 24.6 341.2-1.1 272 0 166.6 0 74.6 60.1 30.1 148.2l90 69.9c21.4-63.9 81.3-111.6 151.9-111.6z"/>
          </svg>
          Continue with Google
        </a>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-700 ">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
