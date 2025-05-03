import React from "react";

const users = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marshall Nichols",
    email: "marshall-n@gmail.com",
    status: "SUPER ADMIN",
    date: "24 Jun, 2015",
    role: "CEO and Founder",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Susie Willis",
    email: "sussie-w@gmail.com",
    status: "ADMIN",
    date: "28 Jun, 2015",
    role: "Team Lead",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marshall Nichols",
    email: "marshall-n@gmail.com",
    status: "ADMIN",
    date: "24 Jun, 2015",
    role: "Team Lead",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Erin Gonzales",
    email: "Erinonzales@gmail.com",
    status: "EMPLOYEE",
    date: "21 July, 2015",
    role: "Web Developer",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Ava Alexander",
    email: "alexander@gmail.com",
    status: "HR ADMIN",
    date: "21 July, 2015",
    role: "HR",
  },
];

const statusColor = {
  "SUPER ADMIN": "bg-red-500",
  ADMIN: "bg-blue-500",
  EMPLOYEE: "bg-yellow-500",
  "HR ADMIN": "bg-green-500",
};

export default function Users() {
  return (
    <div className="p-4">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users List</h2>
      </div> */}

      <div className="flex justify-between mb-4 ">
        <input
          type="text"j
          placeholder="Search here..."
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
        <div className="flex space-x-4">
          <button className="bg-teal-500 text-white px-4 py-2 rounded">Add User</button>
          <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Clear</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created Date</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-white px-3 py-1 rounded text-sm ${statusColor[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">{user.date}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    ✏️
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    🗑️
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