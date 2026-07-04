import {
  FaMapMarkerAlt,
  FaFutbol,
  FaEdit,
  FaStar,
  FaUsers,
  FaTrophy,
  FaBolt,
} from "react-icons/fa";

import { useState } from "react";
import ProfileSetup from "./ProfileSetup";

function ProfileCard() {
  const [editing, setEditing] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const profileCompleted =
    user?.city &&
    user?.sport &&
    user?.skillLevel &&
    user?.bio;

  if (!profileCompleted || editing) {
    return (
      <ProfileSetup
        onProfileSaved={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-green-600"></div>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

      <div className="relative p-5 sm:p-8 text-white">

        <div className="flex flex-col xl:flex-row items-center gap-8">

          {/* Profile Image */}
          <div className="relative flex-shrink-0">

            <img
              src={
                user?.profileImage
                  ? user.profileImage
                  : `https://ui-avatars.com/api/?name=${user?.name}&background=2563EB&color=fff&size=256`
              }
              alt="profile"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-xl"
            />

            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>

          </div>

          {/* User Info */}
          <div className="flex-1 text-center xl:text-left">

            <h2 className="text-3xl sm:text-4xl font-bold break-words">
              {user?.name}
            </h2>

            <p className="text-blue-100 mt-2 text-sm sm:text-base">
              {user?.sport} • {user?.skillLevel}
            </p>

            <div className="flex flex-wrap justify-center xl:justify-start gap-2 mt-4">

              <span className="bg-green-500 px-3 py-1 rounded-full text-xs sm:text-sm">
                ✅ Verified Player
              </span>

              <span className="bg-orange-500 px-3 py-1 rounded-full text-xs sm:text-sm">
                ⭐ {user?.skillLevel}
              </span>

              <span className="bg-purple-500 px-3 py-1 rounded-full text-xs sm:text-sm">
                🏆 Sports Enthusiast
              </span>

            </div>

            <div className="flex flex-wrap justify-center xl:justify-start gap-3 mt-5">

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">

                <FaMapMarkerAlt className="inline mr-2" />

                {user?.city}

              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">

                <FaFutbol className="inline mr-2" />

                {user?.sport}

              </span>

            </div>

          </div>

          {/* Edit Button */}
          <button
            onClick={() => setEditing(true)}
            className="bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition w-full sm:w-auto justify-center"
          >
            <FaEdit />
            Edit Profile
          </button>

        </div>

        {/* Bio */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-5">

          <h3 className="font-bold text-lg sm:text-xl mb-3">
            About Me
          </h3>

          <p className="text-sm sm:text-base leading-7 break-words">
            {user?.bio}
          </p>

        </div>

        {/* Achievements */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-5">

          <h3 className="font-bold text-lg sm:text-xl mb-4">
            Achievements 🏆
          </h3>

          <div className="flex flex-wrap gap-3">

            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold text-sm">
              First Match
            </span>

            <span className="bg-blue-500 px-4 py-2 rounded-full text-sm">
              Active Member
            </span>

            <span className="bg-green-500 px-4 py-2 rounded-full text-sm">
              Profile Complete
            </span>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

          <div className="bg-white/10 rounded-2xl p-4 text-center">

            <FaStar
              className="mx-auto mb-2"
              size={22}
            />

            <h3 className="text-xl sm:text-2xl font-bold">
              4.8
            </h3>

            <p className="text-sm">
              Rating
            </p>

          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">

            <FaUsers
              className="mx-auto mb-2"
              size={22}
            />

            <h3 className="text-xl sm:text-2xl font-bold">
              {user?.connections?.length || 0}
            </h3>

            <p className="text-sm">
              Connections
            </p>

          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">

            <FaTrophy
              className="mx-auto mb-2"
              size={22}
            />

            <h3 className="text-xl sm:text-2xl font-bold">
              0
            </h3>

            <p className="text-sm">
              Matches
            </p>

          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">

            <FaBolt
              className="mx-auto mb-2"
              size={22}
            />

            <h3 className="text-xl sm:text-2xl font-bold">
              100%
            </h3>

            <p className="text-sm">
              Active
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;