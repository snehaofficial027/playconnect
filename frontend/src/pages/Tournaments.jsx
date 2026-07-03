import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import {
  getTournaments,
  joinTournament,
} from "../api/tournamentApi";

function Tournaments() {

  const [tournaments, setTournaments] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {

    try {

      const res =
        await getTournaments();

      setTournaments(
        res.data.tournaments
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleJoin = async (id) => {

    try {

      await joinTournament(id);

      alert(
        "Tournament Joined Successfully ✅"
      );

      loadTournaments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed"
      );

    }

  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-slate-900">
            🏆 Tournaments
          </h1>

          <p className="text-slate-500 mt-3">
            Join upcoming sports events
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tournaments.map((tour) => (

            <div
              key={tour._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >

              <h2 className="text-2xl font-bold">
                {tour.title}
              </h2>

              <div className="mt-4 space-y-2">

                <p>
                  🏅 {tour.sport}
                </p>

                <p>
                  📍 {tour.city}
                </p>

                <p>
                  👥 {tour.participants?.length || 0}
                  {" / "}
                  {tour.maxPlayers}
                  {" "}Players
                </p>

                <p>
                  💰 ₹{tour.fee}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    tour.date
                  ).toLocaleDateString()}
                </p>

              </div>

              <button
                disabled={
                  tour.participants?.includes(
                    user?.id
                  )
                }
                onClick={() =>
                  handleJoin(tour._id)
                }
                className={`w-full mt-5 py-3 rounded-xl font-semibold text-white ${
                  tour.participants?.includes(
                    user?.id
                  )
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {tour.participants?.includes(
                  user?.id
                )
                  ? "Joined ✅"
                  : "Join Tournament"}
              </button>

              <Link
                to={`/tournament/${tour._id}`}
                className="block w-full mt-3"
              >

                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
                >
                  View Details
                </button>

              </Link>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Tournaments;