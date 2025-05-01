import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, Home } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-indigo-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-gray-200 flex items-center gap-2">
          <Home size={20} />
          Home
        </Link>
        <Link to="/account" className="hover:text-gray-200 flex items-center gap-2">
          <UserCircle size={20} />
          My Account
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
