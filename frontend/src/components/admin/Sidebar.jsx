import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {

  localStorage.clear();

  alert("Logged Out Successfully");

  navigate("/login");

  window.location.reload();

};

  const closeMenu = () => setOpen(false);

  return (
    <>

      {/* Mobile Header */}

      <div className="lg:hidden bg-slate-900 text-white flex items-center justify-between px-5 py-4 shadow-lg">

        <h1 className="text-2xl font-bold">
          PlayConnect
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={30} />
        </button>

      </div>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`fixed lg:static top-0 left-0 z-50 w-72 min-h-screen bg-slate-900 text-white p-6 transform transition-transform duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* Mobile Close */}

        <div className="flex lg:hidden justify-end mb-5">

          <button onClick={() => setOpen(false)}>
            <X size={30} />
          </button>

        </div>

        <h1 className="text-3xl font-bold mb-10 text-center">
          PlayConnect
        </h1>

        <div className="flex flex-col gap-4">

          <Link
            to="/admin"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/admin/manage-venues"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            🏟 Manage Venues
          </Link>

          <Link
            to="/admin/add-venue"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            ➕ Add Venue
          </Link>

          <Link
            to="/admin/bookings"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            📅 Manage Bookings
          </Link>

          <Link
            to="/admin/users"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            👤 Manage Users
          </Link>

          <Link
            to="/admin/manage-tournaments"
            onClick={closeMenu}
            className="p-3 rounded-xl hover:bg-slate-700 transition"
          >
            🏆 Manage Tournaments
          </Link>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </>
  );
};

export default Sidebar;