import React from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        if (query.trim()) {
          console.log("Search query:", query);
          // Navigate to a search results page or handle the search logic
          navigate(`/search?query=${encodeURIComponent(query)}`);
        } else {
          console.log("Search query is empty");
        }
        // Handle search logic here, e.g., navigate to search results page
    }
    const handleLogoClick = () => {
        navigate("/");
    };
    
  return (
    <div className="w-full px-4 md:px-10 py-3 bg-white flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      
      {/* Left: Logo */}
      <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
        <img
          onClick={handleLogoClick}
          src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Middle: Search Bar */}
      <div className="w-full md:w-1/3 flex items-center bg-gray-100 rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Type here to search.."
          className="px-4 py-2 w-full bg-transparent focus:outline-none"
        />
        <button 
        onClick={handleSearch}      
        className="px-3">
          <Search size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto gap-4">
      
      <div>
        <Link to="/profile">
          <FiUser className="cursor-pointer hover:text-primary" />
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
