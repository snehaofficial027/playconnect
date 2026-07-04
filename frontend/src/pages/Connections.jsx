import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getConnections } from "../api/connectionApi";

function Connections() {
  const [connections, setConnections] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const res =
        await getConnections();

      setConnections(
        res.data.connections
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-8 sm:mb-10">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              My Connections
            </h1>

            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Players connected with you
            </p>

          </div>

          {connections.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Connections Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Accept requests to build your network.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {connections.map((conn) => {

                const player =
                  conn.sender._id === user.id
                    ? conn.receiver
                    : conn.sender;

                return (

                  <div
                    key={conn._id}
                    className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                  >

                    <div className="flex flex-col items-center">

                      <img
                        src={
                          player.profileImage ||
                          `https://ui-avatars.com/api/?name=${player.name}`
                        }
                        alt={player.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-500"
                      />

                      <h2 className="mt-4 text-xl sm:text-2xl font-bold text-center break-words">
                        {player.name}
                      </h2>

                      <p className="text-gray-500 text-center mt-2">
                        📍 {player.city || "City Not Added"}
                      </p>

                      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full mt-4 text-sm">
                        {player.sport || "Sport"}
                      </span>

                      <Link
                        to={`/chat/${player._id}`}
                        state={{
                          playerName: player.name,
                          playerImage:
                            player.profileImage,
                        }}
                        className="w-full"
                      >
                        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                          💬 Chat
                        </button>
                      </Link>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Connections;