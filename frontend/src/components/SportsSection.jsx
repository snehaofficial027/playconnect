import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";

const sports = [
  {
    name: "Cricket",
    icon: "🏏",
    players: "2500+ Players",
  },
  {
    name: "Football",
    icon: "⚽",
    players: "1800+ Players",
  },
  {
    name: "Badminton",
    icon: "🏸",
    players: "3200+ Players",
  },
  {
    name: "Chess",
    icon: "♟️",
    players: "900+ Players",
  },
  {
    name: "Basketball",
    icon: "🏀",
    players: "1200+ Players",
  },
  {
    name: "Table Tennis",
    icon: "🏓",
    players: "800+ Players",
  },
];

function SportsSection() {

  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] =
    useState(false);

  const isLoggedIn =
    !!localStorage.getItem("token");

  const handleProtectedClick = () => {

    if (isLoggedIn) {

      navigate("/players");

    } else {

      setShowLoginPopup(true);

    }

  };

  return (

    <>

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-slate-900">

            Popular Sports

          </h2>

          <p className="text-center text-slate-500 mt-4">

            Find players based on your favourite sport

          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {sports.map((sport, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                <div className="text-6xl">

                  {sport.icon}

                </div>

                <h3 className="text-2xl font-bold mt-5">

                  {sport.name}

                </h3>

                <p className="text-slate-500 mt-2">

                  {sport.players}

                </p>

                <button

                  onClick={handleProtectedClick}

                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"

                >

                  👥 Find Players

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      <LoginRequiredModal

        isOpen={showLoginPopup}

        onClose={() => setShowLoginPopup(false)}

      />

    </>

  );

}

export default SportsSection;