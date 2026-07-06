import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!localStorage.getItem("token");

  const [networkOpen, setNetworkOpen] = useState(false);

  const [tournamentOpen, setTournamentOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();

  };

  return (

<nav className="bg-white shadow-md sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

<Link
to="/"
className="flex items-center gap-2 text-3xl font-bold text-blue-600"
>

🏆 PlayConnect

</Link>

{/* CENTER MENU */}

<div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

  {isLoggedIn && (

    <>

      <Link
        to="/dashboard"
        className="hover:text-blue-600 transition"
      >
        Dashboard
      </Link>

      {/* Network */}

      <div className="relative">

        <button
          onClick={() => {

            setNetworkOpen(!networkOpen);
            setTournamentOpen(false);

          }}
          className="hover:text-blue-600 transition"
        >
          Network ▼
        </button>

        {networkOpen && (

          <div className="absolute top-10 left-0 bg-white rounded-xl shadow-xl border w-52 py-2">

            <Link
              to="/players"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Find Players
            </Link>

            <Link
              to="/requests"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Requests
            </Link>

            <Link
              to="/connections"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Connections
            </Link>

          </div>

        )}

      </div>

      <Link
  to="/venues"
  className="hover:text-blue-500"
>
  📍 Venues
</Link>

      {/* Tournament */}

      <div className="relative">

        <button
          onClick={() => {

            setTournamentOpen(!tournamentOpen);
            setNetworkOpen(false);

          }}
          className="hover:text-blue-600 transition"
        >
          Tournament ▼
        </button>

        {tournamentOpen && (

          <div className="absolute top-10 left-0 bg-white rounded-xl shadow-xl border w-60 py-2">

            <Link
              to="/tournaments"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              View Tournaments
            </Link>

            <Link
              to="/my-tournaments"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Tournaments
            </Link>

            <Link
              to="/create-tournament"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Create Tournament
            </Link>

          </div>

        )}

      </div>

    </>

  )}

</div>

{/* RIGHT SIDE */}

<div className="flex items-center gap-4">

  {!isLoggedIn ? (

    <>

      <Link
        to="/login"
        className="font-semibold hover:text-blue-600 transition"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
      >
        Signup
      </Link>

    </>

  ) : (

    <div className="relative">

      <button
        onClick={() =>
          setProfileOpen(!profileOpen)
        }
        className="flex items-center gap-3"
      >

        <img
          src={
            user?.profileImage ||
            `https://ui-avatars.com/api/?name=${user?.name}`
          }
          alt=""
          className="w-10 h-10 rounded-full object-cover border"
        />

        <span className="font-semibold">
          {user?.name}
        </span>

        ▼

      </button>

      {profileOpen && (

    <div className="absolute right-0 top-14 z-50 bg-white rounded-xl shadow-2xl border w-64 py-2">

          <Link
            to="/profile"
            className="block px-5 py-3 hover:bg-gray-100"
          >
            👤 My Profile
          </Link>

          <Link
            to="/dashboard"
            className="block px-5 py-3 hover:bg-gray-100"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/connections"
            className="block px-5 py-3 hover:bg-gray-100"
          >
            💬 Chats
          </Link>

          <Link
            to="/my-tournaments"
            className="block px-5 py-3 hover:bg-gray-100"
          >
            🏆 My Tournaments
          </Link>

          <Link
  to="/my-bookings"
  className="block px-5 py-3 hover:bg-gray-100"
>
  📅 My Bookings
</Link>

          <hr />

          <button
            onClick={logout}
            className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>

        </div>

      )}

    </div>

  )}

</div>

</div>

</nav>

  );

}

export default Navbar;