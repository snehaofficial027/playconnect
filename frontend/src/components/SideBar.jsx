import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        🛠 Admin Panel
      </h2>

      <div className="flex flex-col gap-4">

        <Link
          to="/admin"
          className="hover:text-blue-400"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="hover:text-blue-400"
        >
          👥 Manage Users
        </Link>

        <Link
          to="/admin/manage-venues"
          className="hover:text-blue-400"
        >
          🏟 Manage Venues
        </Link>

        <Link
          to="/admin/bookings"
          className="hover:text-blue-400"
        >
          📅 Manage Bookings
        </Link>

        <Link
          to="/admin/manage-tournaments"
          className="hover:text-blue-400"
        >
          🏆 Manage Tournaments
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;