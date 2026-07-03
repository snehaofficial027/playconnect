import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getMyTournaments
} from "../api/tournamentApi";

function MyTournaments() {

  const [
    tournaments,
    setTournaments
  ] = useState([]);

  useEffect(() => {
    loadMyTournaments();
  }, []);

  const loadMyTournaments =
    async () => {

      try {

        const res =
          await getMyTournaments();

        setTournaments(
          res.data.tournaments
        );

      } catch (error) {
        console.log(error);
      }

    };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 p-10">

        <h1 className="text-5xl font-bold mb-10 text-center">
          🏆 My Tournaments
        </h1>

        {tournaments.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl shadow text-center">

            <h2 className="text-2xl font-bold">
              No Tournament Joined
            </h2>

            <p className="text-gray-500 mt-2">
              Join tournaments to see them here.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {tournaments.map(
              (tour) => (

                <div
                  key={tour._id}
                  className="bg-white rounded-3xl shadow-lg p-6"
                >

                  <h2 className="text-2xl font-bold">
                    {tour.title}
                  </h2>

                  <p className="mt-3">
                    🏅 {tour.sport}
                  </p>

                  <p>
                    📍 {tour.city}
                  </p>

                  <p>
                    📅 {new Date(
                      tour.date
                    ).toLocaleDateString()}
                  </p>

                  <div className="mt-5 bg-green-100 text-green-700 text-center py-2 rounded-xl font-semibold">
                    Joined ✅
                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default MyTournaments;