import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Complete Web Development",
      price: 5999,
      discount: 20,
      description: "Learn full-stack web development from scratch.",
    },
    {
      id: 2,
      title: "Blockchain Basics",
      price: 4999,
      discount: 15,
      description: "Understand the fundamentals of blockchain technology.",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
  });

  const [editingCourseId, setEditingCourseId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price || !newCourse.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId = courses.length ? courses[courses.length - 1].id + 1 : 1;
    setCourses([...courses, { ...newCourse, id: newId }]);
    setNewCourse({ title: "", price: "", discount: "", description: "" });
  };

  const handleEditCourse = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setNewCourse(courseToEdit);
    setEditingCourseId(id);
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    setCourses(
      courses.map((course) =>
        course.id === editingCourseId ? { ...newCourse, id: editingCourseId } : course
      )
    );
    setNewCourse({ title: "", price: "", discount: "", description: "" });
    setEditingCourseId(null);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
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
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">₹{course.price}</td>
                  <td className="px-4 py-2">{course.discount || "N/A"}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditCourse(course.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
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
    </div>
  );
};

export default AdminCourseManagement;