import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";

function Hero() {

  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleProtectedClick = () => {

  if (isLoggedIn) {

    navigate("/players");

  } else {

    setShowLoginPopup(true);

  }

};

  return (

    <>

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center py-10 lg:py-0">

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm">

                🏆 India's Smart Sports Partner Finder

              </span>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mt-6 leading-tight">

                Find Your Perfect

                <span className="text-blue-500 block">

                  Sports Partner

                </span>

              </h1>

              <p className="text-slate-300 text-base sm:text-lg lg:text-xl mt-6 leading-relaxed">

                Connect with nearby players, join matches, discover venues,
                participate in tournaments and let AI find the best teammates.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <button

                  onClick={handleProtectedClick}

                 className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-8 py-4 rounded-xl font-semibold transition"

                >

                  🚀 Start Playing

                </button>

             <Link to="/venues">
  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition">
    🚀 Book Now
  </button>
</Link>

              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12">

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

            <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-10 lg:mt-0">

              <div className="overflow-hidden rounded-3xl shadow-2xl">

                <img

                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"

                  alt="Football"

                  className="w-full h-44 sm:h-56 lg:h-64 object-cover hover:scale-110 duration-500"

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

                  className="w-full h-52 sm:h-64 lg:h-72 object-cover hover:scale-110 duration-500"

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