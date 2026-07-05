import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { API_URL } from "../config";

function TournamentDetails() {

  const { id } = useParams();

  const [tournament, setTournament] =
    useState(null);

  useEffect(() => {

    loadTournament();

  }, []);

  const loadTournament =
    async () => {

      try {

        const res =
          await axios.get(
`${API_URL}/api/tournament/${id}`
);
        

        setTournament(
          res.data.tournament
        );

      } catch (error) {

        console.log(error);

      }
    };

  if (!tournament) {

    return (
      <>
        <Header />

        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 py-10 px-6">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-4">
            {tournament.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">

            <div>
              <p>
                <b>Sport:</b>{" "}
                {tournament.sport}
              </p>

              <p>
                <b>City:</b>{" "}
                {tournament.city}
              </p>

              <p>
                <b>Fee:</b> ₹
                {tournament.fee}
              </p>
            </div>

            <div>
              <p>
                <b>Date:</b>{" "}
                {new Date(
                  tournament.date
                ).toLocaleDateString()}
              </p>

              <p>
                <b>Players:</b>{" "}
                {tournament.participants?.length || 0}
                /
                {tournament.maxPlayers}
              </p>
            </div>

          </div>

          <div className="mb-8">

            <h2 className="text-2xl font-bold mb-2">
              Description
            </h2>

            <p className="text-gray-700">
              {tournament.description}
            </p>

          </div>

          <h2 className="text-2xl font-bold mb-4">
            Participants
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {tournament.participants?.length >
            0 ? (

              tournament.participants.map(
                (player) => (

                  <div
                    key={player._id}
                    className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl"
                  >

                    <img
                      src={
                        player.profileImage ||
                        `https://ui-avatars.com/api/?name=${player.name}`
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {player.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {player.city}
                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <p>
                No participants yet.
              </p>

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default TournamentDetails;