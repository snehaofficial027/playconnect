import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-10 py-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            🛠 Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-3">
            Manage your PlayConnect platform
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            to="/admin/add-venue"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 text-center shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">➕</div>

            <h2 className="text-2xl font-bold">
              Add Venue
            </h2>

            <p className="mt-2 text-blue-100">
              Create New Venue
            </p>
          </Link>

          <Link
            to="/admin/manage-venues"
            className="bg-green-600 hover:bg-green-700 text-white rounded-3xl p-8 text-center shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">🏟</div>

            <h2 className="text-2xl font-bold">
              Manage Venues
            </h2>

            <p className="mt-2 text-green-100">
              View / Edit / Delete
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-3xl p-8 text-center shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">👥</div>

            <h2 className="text-2xl font-bold">
              Manage Users
            </h2>

            <p className="mt-2 text-purple-100">
              View All Users
            </p>
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-3xl p-8 text-center shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-2xl font-bold">
              Bookings
            </h2>

            <p className="mt-2 text-orange-100">
              Venue Bookings
            </p>
          </Link>

          <Link
            to="/admin/manage-tournaments"
            className="bg-red-600 hover:bg-red-700 text-white rounded-3xl p-8 text-center shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">🏆</div>

            <h2 className="text-2xl font-bold">
              Tournaments
            </h2>

            <p className="mt-2 text-red-100">
              Edit / Delete
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;