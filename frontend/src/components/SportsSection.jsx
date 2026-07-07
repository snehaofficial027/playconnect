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

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

 const handleFindPlayers = () => {
  navigate("/players");
};

  return (
    <>
      <section className="py-14 sm:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
            Popular Sports
          </h2>

          <p className="text-center text-slate-500 mt-4 text-base sm:text-lg">
            Find players based on your favourite sport
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-16">

            {sports.map((sport, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >

                <div className="text-5xl sm:text-6xl">
                  {sport.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mt-5">
                  {sport.name}
                </h3>

                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  {sport.players}
                </p>

                <button
  onClick={handleFindPlayers}
  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
>
  👥 Find Players
</button>

              </div>
            ))}

          </div>

        </div>
      </section>

    </>
  );
}

export default SportsSection;