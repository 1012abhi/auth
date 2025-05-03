import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [adminId, setAdminId] = useState(""); // Define adminId state
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    category: "",
    thumbnail: "",
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Fetch courses created by the admin
  const fetchCoursesByAdmin = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getcourse/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the Authorization header
        },
      }); <tbody>
        {currentCourses.map((course) => (
          <tr key={course?._id} className="border-t border-gray-200">
            <td className="px-4 py-2">{course?.title}</td>
            <td className="px-4 py-2">₹{course?.price}</td>
            <td className="px-4 py-2">{course?.discount || "N/A"}</td>
            <td className="px-4 py-2">{course?.category}</td>
            <td className="px-4 py-2">
              {course?.createdAt
                ? new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(course.createdAt))
                : "N/A"}
            </td>
            <td className="px-4 py-2 space-x-2">
              <button
                onClick={() => handleEditCourse(course?._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteCourse(course?._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      console.log("Fetched courses by admin:", response.data); // Log the fetched data for debugging

      if (response.data.success) {
        setCourses(response.data.data); // Update the courses state with the fetched data
      } else {
        alert("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error fetching courses by admin:", error);
      alert("An error occurred while fetching courses.");
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    const adminIdFromToken = localStorage.getItem("user"); // Assuming admin ID is stored in localStorage

    if (adminIdFromToken) {
      try {
        const parsedAdmin = JSON.parse(adminIdFromToken); // Parse the JSON string
        console.log('Parsed admin:', parsedAdmin);
        console.log('Admin ID:', parsedAdmin.id);

        setAdminId(parsedAdmin.id); // Set the adminId state
        fetchCoursesByAdmin(parsedAdmin.id); // Fetch courses created by the admin
      } catch (error) {
        console.error("Error parsing adminIdFromToken:", error);
        alert("Invalid admin data. Please log in again.");
      }
    } else {
      alert("Admin ID not found. Please log in again.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price || !newCourse.description || !newCourse.category || !newCourse.thumbnail) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/createcourse`, newCourse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        alert("Course added successfully!");
        setNewCourse({ title: "", price: "", discount: "", description: "", category: "", thumbnail: "" });
        fetchCoursesByAdmin(adminId); // Fetch the updated list of courses
      } else {
        alert(response.data.message || "Failed to add course.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find((course) => course._id === id);
    setNewCourse(courseToEdit);
    setEditingCourseId(id);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/updatecourse/${editingCourseId}`, newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.data.success) {
        alert("Course updated successfully!");
        setCourses(
          courses.map((course) =>
            course._id === editingCourseId ? { ...newCourse, _id: editingCourseId } : course
          )
        );
        setNewCourse({ title: "", price: "", discount: "", description: "", category: "", thumbnail: "" });
        setEditingCourseId(null);
      } else {
        alert(response.data.message || "Failed to update course.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("An error occurred while updating the course.");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (!token) {
          alert("Authentication token is missing. Please log in again.");
          return;
        }
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deletecourse/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        if (response.data.success) {
          alert("Course deleted successfully!");
          setCourses(courses.filter((course) => course._id !== id));
        } else {
          alert(response.data.message || "Failed to delete course.");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("An error occurred while deleting the course.");
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Courses</h1>

      {/* Add/Edit Course Form */}
      <form
        onSubmit={editingCourseId ? handleUpdateCourse : handleAddCourse}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingCourseId ? "Edit Course" : "Add New Course"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={newCourse.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={newCourse.discount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={newCourse.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={newCourse.thumbnail}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editingCourseId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* Courses Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Courses List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Price (₹)</th>
                <th className="px-4 py-2 text-left">Discount (%)</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Created date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr key={course?._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{course?.title}</td>
                  <td className="px-4 py-2">₹{course?.price}</td>
                  <td className="px-4 py-2">{course?.discount || "N/A"}</td>
                  <td className="px-4 py-2">{course?.category}</td>
                  <td className="px-4 py-2">
                    {course?.createdAt
                      ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(course.createdAt))
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditCourse(course?._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course?._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between gap-2 items-center mt-6">
        {/* Total Pages Info */}
        <p className="text-gray-600 mb-2">
          Page {currentPage} of {totalPages}
        </p>
        {/* Pagination Buttons */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                } hover:bg-blue-500 transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseManagement;