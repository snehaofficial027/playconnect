import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  FaMapMarkerAlt,
  FaFutbol,
  FaStar,
} from "react-icons/fa";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Header />

      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen p-8">

        <div className="max-w-5xl mx-auto">

          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">

            {/* Cover */}
            <div className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 relative">

              <div className="absolute -bottom-16 left-10">

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-5xl text-white">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

              </div>

            </div>

            {/* Content */}
            <div className="pt-20 p-10 text-white">

              <h1 className="text-4xl font-bold">
                {user?.name}
              </h1>

              <p className="text-slate-400">
                Sports Athlete
              </p>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-5 mt-8">

                <div className="bg-slate-800 rounded-2xl p-5">
                  <FaMapMarkerAlt className="text-green-400 text-2xl mb-3" />
                  <h3 className="font-bold">
                    City
                  </h3>
                  <p>{user?.city}</p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <FaFutbol className="text-blue-400 text-2xl mb-3" />
                  <h3 className="font-bold">
                    Sport
                  </h3>
                  <p>{user?.sport}</p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <FaStar className="text-yellow-400 text-2xl mb-3" />
                  <h3 className="font-bold">
                    Skill Level
                  </h3>
                  <p>{user?.skillLevel}</p>
                </div>

              </div>

              {/* Bio */}
              <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  About Me
                </h2>

                <div className="bg-slate-800 rounded-2xl p-6">
                  {user?.bio}
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

export default Profile;