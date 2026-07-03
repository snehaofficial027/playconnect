import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPlayerById } from "../api/userApi";

function PlayerProfile() {

  const { id } = useParams();

  const [player, setPlayer] =
    useState(null);

  useEffect(() => {
    loadPlayer();
  }, []);

  const loadPlayer = async () => {
    try {

      const res =
        await getPlayerById(id);

      setPlayer(
        res.data.player
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (!player)
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 py-10 px-6">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-green-500 h-40"></div>

          <div className="text-center -mt-16 p-8">

            <img
              src={
                player.profileImage ||
                `https://ui-avatars.com/api/?name=${player.name}`
              }
              alt=""
              className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover"
            />

            <h1 className="text-4xl font-bold mt-4">
              {player.name}
            </h1>

            <p className="text-gray-500">
              📍 {player.city}
            </p>

            <div className="flex justify-center gap-3 mt-4">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {player.sport}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                {player.skillLevel}
              </span>

            </div>

            <div className="mt-8 text-left">

              <h2 className="text-2xl font-bold mb-3">
                About Player
              </h2>

              <p className="text-gray-700">
                {player.bio ||
                  "No bio added"}
              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default PlayerProfile;