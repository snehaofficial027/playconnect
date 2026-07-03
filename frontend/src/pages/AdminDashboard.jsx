import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        🛠 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Link
          to="/admin/add-venue"
          className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-2xl text-center shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            ➕ Add Venue
          </h2>

          <p className="mt-3">
            Create New Venue
          </p>
        </Link>

        <Link
          to="/admin/manage-venues"
          className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-2xl text-center shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            🏟 Manage Venues
          </h2>

          <p className="mt-3">
            View / Edit / Delete
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-purple-600 hover:bg-purple-700 text-white p-8 rounded-2xl text-center shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            👥 Manage Users
          </h2>

          <p className="mt-3">
            View All Users
          </p>
        </Link>

        <Link
          to="/admin/bookings"
          className="bg-orange-600 hover:bg-orange-700 text-white p-8 rounded-2xl text-center shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            📅 Manage Bookings
          </h2>

          <p className="mt-3">
            View Venue Bookings
          </p>
        </Link>

        <Link
          to="/admin/manage-tournaments"
          className="bg-red-600 hover:bg-red-700 text-white p-8 rounded-2xl text-center shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            🏆 Manage Tournaments
          </h2>

          <p className="mt-3">
            Edit / Delete Tournaments
          </p>
        </Link>

      </div>

    </div>
  );
};

export default AdminDashboard;