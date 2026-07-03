import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10 text-center">
        PlayConnect
      </h1>

      <div className="flex flex-col gap-4">

      <Link
  to="/admin"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  🏠 Dashboard
</Link>

<Link
  to="/admin/manage-venues"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  🏟 Manage Venues
</Link>

<Link
  to="/admin/add-venue"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  ➕ Add Venue
</Link>

<Link
  to="/admin/bookings"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  📅 Manage Bookings
</Link>

<Link
  to="/admin/users"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  👤 Manage Users
</Link>

<Link
  to="/admin/manage-tournaments"
  className="p-3 rounded-lg hover:bg-slate-700"
>
  🏆 Manage Tournaments
</Link>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;