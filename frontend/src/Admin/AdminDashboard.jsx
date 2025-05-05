import React, { useState, useEffect } from "react";
import { FaUsers, FaBook, FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    mostSoldCourse: "",
    salesData: [],
    salesByDate: [],
  });
  const [totalNonAdminUsers, setTotalNonAdminUsers] = useState(0); // State for non-admin users
  const [courses, setCourses] = useState([]); // Holds the list of course objects
  const [selectedCourse, setSelectedCourse] = useState("All Courses");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getallusers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (usersResponse.data.success) {
          const users = usersResponse.data.data;

          // Filter out admins and count non-admin users
          const nonAdminUsers = users.filter((user) => user.role !== "admin");
          setTotalNonAdminUsers(nonAdminUsers.length);

          // Update total users
          setDashboardData((prevData) => ({
            ...prevData,
            totalUsers: users.length,
          }));
        } else {
          alert("Failed to fetch user data.");
        }

        // Fetch courses created by the logged-in admin
        const adminIdFromToken = localStorage.getItem("user"); // Assuming admin ID is stored in localStorage
        if (!adminIdFromToken) {
          alert("Admin ID not found. Please log in again.");
          return;
        }

        const parsedAdmin = JSON.parse(adminIdFromToken); // Parse the JSON string
        const adminId = parsedAdmin.id;

        const coursesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/getcoursesbyadmin/${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (coursesResponse.data.success) {
          const courses = coursesResponse.data.data;

          // Update total courses and course list
          setCourses(courses);
          setDashboardData((prevData) => ({
            ...prevData,
            totalCourses: courses.length,
          }));
        } else {
          alert("Failed to fetch course data.");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("An error occurred while fetching dashboard data.");
      }
    };

    fetchDashboardData();
  }, []);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const filteredSalesByDate =
    selectedCourse === "All Courses"
      ? dashboardData.salesByDate || [] // Default to an empty array if undefined
      : (dashboardData.salesByDate || []).filter((item) => item.course === selectedCourse);

  const uniqueDates = [...new Set(filteredSalesByDate.map((item) => item.date))];

  const salesByDateData = {
    labels: uniqueDates,
    datasets: (dashboardData.salesData || []) // Default to an empty array if undefined
      .filter((course) => selectedCourse === "All Courses" || course.course === selectedCourse)
      .map((course) => {
        const courseSales = filteredSalesByDate.filter((item) => item.course === course.course);
        return {
          label: course.course,
          data: uniqueDates.map(
            (date) => courseSales.find((item) => item.date === date)?.quantity || 0
          ),
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 1)`,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          tension: 0.4,
          fill: false,
        };
      }),
  };

  const salesByDateOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Sales by Date (${selectedCourse})`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Admin</h2>
            <p className="text-gray-600">{dashboardData.totalUsers}</p>
          </div>
        </div>

        {/* Total Non-Admin Users */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-purple-500 text-white p-4 rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-gray-600">{totalNonAdminUsers}</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-green-500 text-white p-4 rounded-full">
            <FaBook size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Courses</h2>
            <p className="text-gray-600">{dashboardData.totalCourses}</p>
          </div>
        </div>

        {/* Most Sold Course */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <FaChartLine size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Most Sold Course</h2>
            <p className="text-gray-600">{dashboardData.mostSoldCourse}</p>
          </div>
        </div>
      </div>

      {/* Dropdown for Course Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Course</h2>
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All Courses">All Courses</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Sales by Date Graph */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sales by Date</h2>
        <Line data={salesByDateData} options={salesByDateOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;