import { FaEdit, FaTrash } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Marshall Nichols",
    email: "marshall-n@gmail.com",
    status: "Active",
    createdDate: "24 Jun, 2015",
    role: "CEO and Founder",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Susie Willis",
    email: "sussie-w@gmail.com",
    status: "Inactive",
    createdDate: "28 Jun, 2015",
    role: "Team Lead",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Erin Gonzales",
    email: "erinonzales@gmail.com",
    status: "Active",
    createdDate: "21 Jul, 2015",
    role: "Web Developer",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
};

export default function UserTable() {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Users List</h2>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-gray-600 bg-gray-100">
            <tr>
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created Date</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3">{user.createdDate}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
