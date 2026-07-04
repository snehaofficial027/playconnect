import ProfileCard from "../components/ProfileCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      socket.emit("join", user.id);
    }
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

          {/* Welcome Hero */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-green-600"></div>

            <div className="absolute -top-20 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative p-5 sm:p-8 text-white">

              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                <div className="text-center lg:text-left">

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Welcome {user?.name} 👋
                  </h1>

                  <p className="mt-3 text-blue-100 text-base sm:text-lg">
                    Connect with players, build your sports network,
                    and grow your game.
                  </p>

                </div>

                <div className="flex flex-wrap justify-center gap-3">

                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                    🏆 Athlete
                  </div>

                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                    ⚡ Active
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left */}
            <div className="lg:col-span-2">
              <ProfileCard />
            </div>

            {/* Right */}
            <div>

              <div className="relative overflow-hidden rounded-3xl shadow-2xl">

                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950"></div>

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>

                <div className="relative p-5 sm:p-6 text-white">

                  <h2 className="text-xl sm:text-2xl font-bold mb-6">
                    Quick Actions ⚡
                  </h2>

                  <div className="space-y-4">

                    <Link to="/players">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 sm:py-4 rounded-xl font-semibold transition">
                        🎯 Find Players
                      </button>
                    </Link>

                    <Link to="/requests">
                      <button className="w-full bg-green-500 hover:bg-green-600 py-3 sm:py-4 rounded-xl font-semibold transition">
                        📨 Match Requests
                      </button>
                    </Link>

                    <Link to="/ai">
                      <button className="w-full bg-purple-500 hover:bg-purple-600 py-3 sm:py-4 rounded-xl font-semibold transition">
                        🤖 AI Suggestions
                      </button>
                    </Link>

                    <Link to="/connections">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 sm:py-4 rounded-xl font-semibold transition">
                        💬 Messages
                      </button>
                    </Link>

                  </div>

                  {/* Profile Completion */}
                  <div className="mt-8 bg-white/10 rounded-2xl p-4 border border-white/10">

                    <h3 className="font-bold">
                      Profile Completion
                    </h3>

                    <div className="w-full bg-slate-700 rounded-full h-3 mt-3">

                      <div className="bg-green-400 h-3 rounded-full w-full"></div>

                    </div>

                    <p className="text-sm text-slate-300 mt-2">
                      Profile completed successfully.
                    </p>

                  </div>

                  {/* Motivation */}
                  <div className="mt-6 bg-white/10 rounded-2xl p-4 border border-white/10">

                    <h3 className="font-bold mb-2">
                      Daily Motivation 💪
                    </h3>

                    <p className="text-sm text-slate-300">
                      Champions keep playing until they get it right.
                    </p>

                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div className="bg-white/10 p-4 rounded-xl text-center">

                      <h3 className="text-2xl font-bold">
                        4.8⭐
                      </h3>

                      <p className="text-sm">
                        Rating
                      </p>

                    </div>

                    <div className="bg-white/10 p-4 rounded-xl text-center">

                      <h3 className="text-2xl font-bold">
                        100%
                      </h3>

                      <p className="text-sm">
                        Active
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;