import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    category: "",
    thumbnail: "",
  });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCoursesByAdmin = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getcourse/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setCourses(response.data.data);
      } else {
        alert("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error fetching courses by admin:", error);
      alert("An error occurred while fetching courses.");
    }
  };

  useEffect(() => {
    const adminIdFromToken = localStorage.getItem("user");
    if (adminIdFromToken) {
      try {
        const parsedAdmin = JSON.parse(adminIdFromToken);
        setAdminId(parsedAdmin.id);
        fetchCoursesByAdmin(parsedAdmin.id);
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
        fetchCoursesByAdmin(adminId);
        setShowForm(false);
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
    setShowForm(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/updatecourse/${editingCourseId}`, newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        setShowForm(false);
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
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication token is missing. Please log in again.");
          return;
        }
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deletecourse/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingCourseId(null);
            setNewCourse({ title: "", price: "", discount: "", description: "", category: "", thumbnail: "" });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          {showForm ? "Close Form" : "Add Course"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={editingCourseId ? handleUpdateCourse : handleAddCourse}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingCourseId ? "Edit Course" : "Add New Course"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={newCourse.title} onChange={handleInputChange} placeholder="Title" required className="input" />
            <input type="number" name="price" value={newCourse.price} onChange={handleInputChange} placeholder="Price" required className="input" />
            <input type="number" name="discount" value={newCourse.discount} onChange={handleInputChange} placeholder="Discount" className="input" />
            <input type="text" name="category" value={newCourse.category} onChange={handleInputChange} placeholder="Category" required className="input" />
            <input type="text" name="thumbnail" value={newCourse.thumbnail} onChange={handleInputChange} placeholder="Thumbnail URL" required className="input" />
            <textarea name="description" value={newCourse.description} onChange={handleInputChange} placeholder="Description" required className="input md:col-span-2" />
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg">
            {editingCourseId ? "Update Course" : "Add Course"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">₹{course.price}</td>
                <td className="px-4 py-2">{course.discount || "N/A"}</td>
                <td className="px-4 py-2">{course.category}</td>
                <td className="px-4 py-2">{new Date(course.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEditCourse(course._id)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
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
