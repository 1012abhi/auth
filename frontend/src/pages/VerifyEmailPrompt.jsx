import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailPrompt = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-8">
          Thank you for signing up! Please check your email inbox for a verification link to activate your account.
        </p>
        <Link
          to="/login"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPrompt;