import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getUsers,
  deleteUser,
  changeRole,
} from "../../api/userApi";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const removeUser = async (id) => {

    if (!window.confirm("Delete User?"))
      return;

    await deleteUser(id);

    loadUsers();

  };

  const updateRole = async (
    id,
    role
  ) => {

    await changeRole(id, role);

    loadUsers();

  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Manage Users
        </h1>

        <table className="w-full bg-white rounded-xl shadow">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    onClick={() =>
                      updateRole(
                        user._id,
                        user.role === "admin"
                          ? "user"
                          : "admin"
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-2 rounded mr-2"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() =>
                      removeUser(user._id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;