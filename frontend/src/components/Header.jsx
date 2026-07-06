import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

import { getNotifications } from "../api/notificationApi";
import ProtectedLink from "./ProtectedLink";

function Header() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!localStorage.getItem("token");

  const [notifications, setNotifications] = useState({
    requests: 0,
    messages: 0,
    total: 0,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [networkOpen, setNetworkOpen] = useState(false);

  const [tournamentOpen, setTournamentOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notificationRef = useRef(null);

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const loadNotifications = async () => {

    try {

      const res = await getNotifications();

      setNotifications(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
      window.location.reload();

  };

  return (

<header className="bg-white shadow-md sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">

<Link
to="/"
className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-blue-600"
>

<span>🏆</span>

<span>PlayConnect</span>

</Link>

<nav className="hidden lg:flex items-center gap-6 font-semibold text-gray-700">

{isLoggedIn && (

<>
<ProtectedLink
to="/dashboard"
className="px-4 py-2 hover:text-blue-600 transition"
>
Dashboard
</ProtectedLink>

<ProtectedLink
to="/venues"
className="px-4 py-2 hover:text-blue-600 transition"
>
Venues
</ProtectedLink>

<div className="relative">

<button
onClick={()=>{
setNetworkOpen(!networkOpen);
setTournamentOpen(false);
}}
className="px-4 py-2 hover:text-blue-600 transition flex items-center gap-1"
>

Network

<span className="text-xs">▼</span>

</button>

{networkOpen && (

<div className="absolute top-12 left-0 w-52 bg-white rounded-xl shadow-xl border py-2">

<ProtectedLink
to="/players"
className="block px-4 py-2 hover:bg-gray-100"
>
Find Players
</ProtectedLink>

<ProtectedLink
to="/requests"
className="block px-4 py-2 hover:bg-gray-100"
>
Requests
</ProtectedLink>

<ProtectedLink
to="/connections"
className="block px-4 py-2 hover:bg-gray-100"
>
Connections
</ProtectedLink>

</div>

)}

</div>

<div className="relative">

<button
onClick={()=>{
setTournamentOpen(!tournamentOpen);
setNetworkOpen(false);
}}
className="px-4 py-2 hover:text-blue-600 transition flex items-center gap-1"
>

Tournaments

<span className="text-xs">▼</span>

</button>

{tournamentOpen && (

<div className="absolute top-12 left-0 w-56 bg-white rounded-xl shadow-xl border py-2">

<ProtectedLink
to="/tournaments"
className="block px-4 py-2 hover:bg-gray-100"
>
View Tournaments
</ProtectedLink>

<ProtectedLink
to="/my-tournaments"
className="block px-4 py-2 hover:bg-gray-100"
>
My Tournaments
</ProtectedLink>

<ProtectedLink
to="/create-tournament"
className="block px-4 py-2 hover:bg-gray-100"
>
Create Tournament
</ProtectedLink>

</div>

)}

</div>

<div
ref={notificationRef}
className="relative"
>

<button
onClick={() => setNotificationOpen(!notificationOpen)}
className="relative p-2 rounded-full hover:bg-gray-100"
>

<span className="text-2xl">🔔</span>

{notifications.total > 0 && (

<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] min-w-[20px] h-5 flex items-center justify-center rounded-full">

{notifications.total}

</span>

)}

</button>

{notificationOpen && (

<div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border overflow-hidden">

<div className="px-4 py-3 font-bold border-b">
Notifications
</div>

<div className="p-4 space-y-4">

<div className="flex justify-between bg-blue-50 rounded-xl p-3">

<div>

<p className="font-semibold">🔔 Requests</p>

<p className="text-xs text-gray-500">
Pending Requests
</p>

</div>

<span className="font-bold text-blue-600">
{notifications.requests}
</span>

</div>

<div className="flex justify-between bg-green-50 rounded-xl p-3">

<div>

<p className="font-semibold">💬 Messages</p>

<p className="text-xs text-gray-500">
Unread Messages
</p>

</div>

<span className="font-bold text-green-600">
{notifications.messages}
</span>

</div>

</div>

</div>

)}

</div>

</>

)}

</nav>

{/* Right Side */}

<div className="hidden lg:flex items-center">

  {!isLoggedIn ? (

    <div className="flex gap-3">

      <Link
        to="/login"
        className="px-5 py-2 rounded-lg hover:text-blue-600 font-semibold"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Signup
      </Link>

    </div>

  ) : (

    <div className="relative">

      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-3"
      >

        <img
          src={
            user?.profileImage ||
            `https://ui-avatars.com/api/?name=${user?.name}`
          }
          className="w-10 h-10 rounded-full object-cover"
          alt=""
        />

        <span className="font-semibold">
          {user?.name}
        </span>

        <span className="text-xs">▼</span>

      </button>

      {profileOpen && (

        <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border py-2">

          <Link
            to="/profile"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            👤 Profile
          </Link>

          <Link
            to="/my-bookings"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            📅 My Bookings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
          >
            🚪 Logout
          </button>

        </div>

      )}

    </div>

  )}

</div>

{/* Mobile Hamburger */}

<div className="lg:hidden">

  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 rounded-lg hover:bg-gray-100 transition"
  >

    {mobileMenuOpen ? (

      <X size={28} />

    ) : (

      <Menu size={28} />

    )}

  </button>

</div>

</div>

{/* Mobile Menu */}

<div
  className={`lg:hidden overflow-hidden transition-all duration-300 ${
    mobileMenuOpen
      ? "max-h-[900px] border-t shadow-xl"
      : "max-h-0"
  }`}
>

  <div className="bg-white px-5 py-4 space-y-2">

    {isLoggedIn ? (

      <>

        <div className="flex items-center gap-3 border-b pb-4 mb-3">

          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${user?.name}`
            }
            className="w-14 h-14 rounded-full object-cover"
            alt=""
          />

          <div>

            <h2 className="font-bold text-lg">
              {user?.name}
            </h2>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>

        <ProtectedLink
          to="/dashboard"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          🏠 Dashboard
        </ProtectedLink>

        <ProtectedLink
          to="/venues"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          🏟 Venues
        </ProtectedLink>

        <ProtectedLink
          to="/players"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          👥 Find Players
        </ProtectedLink>

        <ProtectedLink
          to="/requests"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          📨 Requests
        </ProtectedLink>

        <ProtectedLink
          to="/connections"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          🤝 Connections
        </ProtectedLink>

        <ProtectedLink
          to="/tournaments"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          🏆 Tournaments
        </ProtectedLink>

        <ProtectedLink
          to="/my-tournaments"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          📋 My Tournaments
        </ProtectedLink>

        <ProtectedLink
          to="/create-tournament"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          ➕ Create Tournament
        </ProtectedLink>

        <Link
          to="/profile"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          👤 Profile
        </Link>

        <Link
          to="/my-bookings"
          onClick={() => setMobileMenuOpen(false)}
          className="block py-3 border-b"
        >
          📅 My Bookings
        </Link>

        <button
          onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
        >
          🚪 Logout
        </button>

      </>

    ) : (

      <div className="space-y-3">

        <Link
          to="/login"
          className="block text-center border rounded-xl py-3"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="block text-center bg-blue-600 text-white rounded-xl py-3"
        >
          Signup
        </Link>

      </div>

    )}

  </div>

</div>

</header>

  );

}

export default Header;