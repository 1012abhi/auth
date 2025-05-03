import { FaHome, FaCalendarAlt, FaUsers, FaWallet, FaChartBar, FaUserShield } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdEvent, MdOutlineTaskAlt } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
  { name: "Users", icon: <FaUserShield />, path: "/admin/userlist" },
  { name: "Course", icon: <FaUserShield />, path: "/admin/course" },
  { name: "Purchased Courses", icon: <FaUserShield />, path: "/admin/purchased-courses" },
  { name: "Payment", icon: <FaHome />, path: "/admin/hr-dashboard" },
  { name: "Order", icon: <FaHome />, path: "/admin/hr-dashboard" },
  { name: "Holidays", icon: <FaCalendarAlt />, path: "/admin/holidays" },
  { name: "Events", icon: <MdEvent />, path: "/admin/events" },
  { name: "Activities", icon: <MdOutlineTaskAlt />, path: "/admin/activities" },
  { name: "HR Social", icon: <IoIosPeople />, path: "/admin/hr-social" },
  { name: "Employees", icon: <FaUsers />, path: "/admin/employees" },
  { name: "Accounts", icon: <FaWallet />, path: "/admin/accounts" },
  { name: "Payroll", icon: <FaChartBar />, path: "/admin/payroll" },
  { name: "Report", icon: <TbReportAnalytics />, path: "/admin/report" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-full w-64 bg-white border-r shadow-sm fixed flex flex-col">
        {/* Sidebar Header */}
        <div className="bg-gray-800 text-white text-center py-6">
          {/* <div className="bg-red-500 w-56 rounded-full">

          </div> */}
          <h1 className="mt-2 mb-4 px-4 py-2 rounded-md transition text-red-500 font-extrabold text-xl font-stretch-100%">Admin Panel</h1>
          {/* <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button> */}
        </div>

        {/* Sidebar Menu */}
        <ul className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center space-x-4 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-base">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 fixed top-0 left-64 right-0 z-10 flex justify-between items-center">
          <h1 className="text-xl text-gray-800 font-bold font-stretch-50%">Welcome to Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-stretch-50%">Admin</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="mt-20 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}