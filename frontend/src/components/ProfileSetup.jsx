import { useState } from "react";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaFutbol,
} from "react-icons/fa";

import { updateProfile } from "../api/userApi";

function ProfileSetup({
  onProfileSaved,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [loading, setLoading] =
    useState(false);

  const [profile, setProfile] =
    useState({
      city: user?.city || "",
      sport: user?.sport || "",
      skillLevel:
        user?.skillLevel || "",
      bio: user?.bio || "",
      profileImage: null,
    });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange = (
    e
  ) => {
    setProfile({
      ...profile,
      profileImage:
        e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "city",
        profile.city
      );

      formData.append(
        "sport",
        profile.sport
      );

      formData.append(
        "skillLevel",
        profile.skillLevel
      );

      formData.append(
        "bio",
        profile.bio
      );

      if (
        profile.profileImage
      ) {
        formData.append(
          "profileImage",
          profile.profileImage
        );
      }

      const response =
        await updateProfile(
          formData
        );

      const existingUser =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      const updatedUser = {
        ...existingUser,
        ...response.data.user,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      alert(
        "Profile Saved Successfully 🎉"
      );

      if (onProfileSaved) {
        onProfileSaved();
      }
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Profile Save Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-slate-900 to-green-600"></div>

      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative p-8 text-white">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border border-white/30">

            <FaUserCircle size={55} />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Complete Your Profile
            </h2>

            <p className="text-slate-200 mt-1">
              Help players discover and connect with you.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Profile Photo */}
          <div>

            <label className="block mb-2 font-medium">
              Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3"
            />

          </div>

          {/* City */}
          <div>

            <label className="block mb-2 font-medium">

              <FaMapMarkerAlt className="inline mr-2" />

              City

            </label>

            <input
              type="text"
              name="city"
              placeholder="Ahmedabad"
              value={profile.city}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 placeholder-slate-300"
            />

          </div>

          {/* Sport */}
          <div>

            <label className="block mb-2 font-medium">

              <FaFutbol className="inline mr-2" />

              Sport

            </label>

            <select
              name="sport"
              value={profile.sport}
              onChange={handleChange}
              className="w-full bg-white/20 text-white border border-white/20 rounded-xl p-3"
            >

              <option value="" className="text-black">
                Select Sport
              </option>

              <option value="Cricket" className="text-black">
                Cricket
              </option>

              <option value="Football" className="text-black">
                Football
              </option>

              <option value="Running" className="text-black">
                Running
              </option>

              <option value="Badminton" className="text-black">
                Badminton
              </option>

              <option value="Chess" className="text-black">
                Chess
              </option>

              <option value="Table Tennis" className="text-black">
                Table Tennis
              </option>

              <option value="Carrom" className="text-black">
                Carrom
              </option>

              <option value="Volleyball" className="text-black">
                Volleyball
              </option>

            </select>

          </div>

          {/* Skill Level */}
          <div>

            <label className="block mb-2 font-medium">
              Skill Level
            </label>

            <select
              name="skillLevel"
              value={
                profile.skillLevel
              }
              onChange={handleChange}
              className="w-full bg-white/20 text-white border border-white/20 rounded-xl p-3"
            >

              <option value="" className="text-black">
                Select Level
              </option>

              <option value="Beginner" className="text-black">
                Beginner
              </option>

              <option value="Intermediate" className="text-black">
                Intermediate
              </option>

              <option value="Advanced" className="text-black">
                Advanced
              </option>

              <option value="Professional" className="text-black">
                Professional
              </option>

            </select>

          </div>

          {/* Bio */}
          <div>

            <label className="block mb-2 font-medium">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              placeholder="Tell players about yourself..."
              value={profile.bio}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 placeholder-slate-300"
            />

          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl transition disabled:opacity-70"
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
      Saving Profile...
    </div>
  ) : (
    "Save Profile"
  )}
</button>

        </form>

      </div>

    </div>
  );
}

export default ProfileSetup;