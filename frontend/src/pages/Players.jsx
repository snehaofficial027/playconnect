import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { getPlayers } from "../api/userApi";
import {
  sendRequest,
  getSentRequests,
} from "../api/connectionApi";

function Players() {
  const [players, setPlayers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      // Login હોય તો જ sent requests લાવો
      if (isLoggedIn) {
        const sentRes = await getSentRequests();

        const sentIds = sentRes.data.requests.map(
          (req) => req.receiver
        );

        setSentRequests(sentIds);
      }

      const response = await getPlayers();

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      const filteredPlayers = response.data.players.filter(
        (player) => player._id !== currentUser?.id
      );

      setPlayers(filteredPlayers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnect = async (receiverId) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    try {
      await sendRequest(receiverId);

      setSentRequests((prev) => [
        ...prev,
        receiverId,
      ]);

      alert("Request Sent ✅");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send request"
      );
    }
  };

  const filteredPlayers = players.filter((player) => {
    const matchSearch = player.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchSport =
      sportFilter === "All"
        ? true
        : player.sport === sportFilter;

    return matchSearch && matchSport;
  });

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find Players
            </h1>

            <p className="text-base sm:text-lg text-slate-300">
              Discover athletes and connect with sports enthusiasts
            </p>
          </div>

          {/* Search */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-8 shadow-lg max-w-4xl mx-auto">

            <div className="flex flex-col md:flex-row gap-4">

              <input
                type="text"
                placeholder="Search Player..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 border border-gray-300 px-4 py-3 rounded-xl"
              />

              <select
                value={sportFilter}
                onChange={(e) =>
                  setSportFilter(e.target.value)
                }
                className="w-full md:w-56 border border-gray-300 px-4 py-3 rounded-xl"
              >
                <option value="All">All Sports</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Chess">Chess</option>
                <option value="Carrom">Carrom</option>
                <option value="Badminton">Badminton</option>
                <option value="Volleyball">Volleyball</option>
              </select>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredPlayers.map((player) => (

              <div
                key={player._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >

                <div className="bg-gradient-to-r from-blue-600 to-green-500 h-28"></div>

                <div className="text-center -mt-12 p-6">

                  {player.profileImage ? (
                    <img
                      src={player.profileImage}
                      alt=""
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto border-4 border-white text-3xl font-bold">
                      {player.name?.charAt(0)}
                    </div>
                  )}

                  <h2 className="text-2xl font-bold mt-4">
                    {player.name}
                  </h2>

                  <p className="text-gray-500">
                    {player.city || "City Not Added"}
                  </p>

                  <div className="flex justify-center gap-2 mt-4 flex-wrap">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {player.sport || "Sport"}
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {player.skillLevel || "Level"}
                    </span>

                  </div>

                  <p className="text-gray-600 mt-3 min-h-[50px]">
                    {player.bio || "No bio available"}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-5">

                    <button
                      disabled={
                        isLoggedIn &&
                        sentRequests.includes(player._id)
                      }
                      onClick={() =>
                        handleConnect(player._id)
                      }
                      className={`flex-1 py-3 rounded-xl font-semibold text-white ${
                        isLoggedIn &&
                        sentRequests.includes(player._id)
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      }`}
                    >
                      {isLoggedIn &&
                      sentRequests.includes(player._id)
                        ? "Request Sent"
                        : "Connect"}
                    </button>

                    <Link
                      to={`/player/${player._id}`}
                      className="flex-1"
                    >
                      <button className="w-full py-3 rounded-xl font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50">
                        View Profile
                      </button>
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>

      <Footer />

      <LoginRequiredModal
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </>
  );
}

export default Players;