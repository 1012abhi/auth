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
  { name: "HR Dashboard", icon: <FaHome />, path: "/admin/hr-dashboard" },
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
  return (
    <div className="flex">
        <div className="h-screen w-64 bg-white border-r shadow-sm fixed">
      <div className="text-center py-6 text-2xl font-bold text-gray-800 border-b">
        <span className="text-black">▲</span> User name
      </div>
      <ul className="px-4 py-6 space-y-2">
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
    <div className="ml-64 flex-1 p-6">
    <Outlet />
  </div>
    </div>
  );
}