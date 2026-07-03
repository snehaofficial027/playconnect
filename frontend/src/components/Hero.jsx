import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";

function Hero() {

  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleProtectedClick = () => {

    if (isLoggedIn) {

      navigate("/dashboard");

    } else {

      setShowLoginPopup(true);

    }

  };

  return (

    <>

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6 py-20 w-full">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">

                🏆 India's Smart Sports Partner Finder

              </span>

              <h1 className="text-white text-5xl lg:text-7xl font-bold mt-6 leading-tight">

                Find Your Perfect

                <span className="text-blue-500 block">

                  Sports Partner

                </span>

              </h1>

              <p className="text-slate-300 text-xl mt-6 leading-relaxed">

                Connect with nearby players, join matches, discover venues,
                participate in tournaments and let AI find the best teammates.

              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <button

                  onClick={handleProtectedClick}

                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition"

                >

                  🚀 Start Playing

                </button>

                <button

                  onClick={handleProtectedClick}

                  className="bg-white hover:bg-gray-100 text-slate-900 px-8 py-4 rounded-xl font-semibold transition"

                >

                  🔍 Explore Sports

                </button>

              </div>

              <div className="grid grid-cols-3 gap-6 mt-14">

                <div>

                  <h2 className="text-white text-3xl font-bold">

                    10K+

                  </h2>

                  <p className="text-slate-400">

                    Players

                  </p>

                </div>

                <div>

                  <h2 className="text-white text-3xl font-bold">

                    500+

                  </h2>

                  <p className="text-slate-400">

                    Matches

                  </p>

                </div>

                <div>

                  <h2 className="text-white text-3xl font-bold">

                    100+

                  </h2>

                  <p className="text-slate-400">

                    Venues

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-5">

              <div className="overflow-hidden rounded-3xl shadow-2xl">

                <img

                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"

                  alt="Football"

                  className="w-full h-64 object-cover hover:scale-110 duration-500"

                />

              </div>

              <div className="overflow-hidden rounded-3xl shadow-2xl">

                <img

                  src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800"

                  alt="Chess"

                  className="w-full h-64 object-cover hover:scale-110 duration-500"

                />

              </div>

              <div className="overflow-hidden rounded-3xl shadow-2xl col-span-2">

                <img

                  src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200"

                  alt="Badminton"

                  className="w-full h-72 object-cover hover:scale-110 duration-500"

                />

              </div>

            </div>

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

export default Hero;