import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllVenues } from "../api/venueApi";

const VenueList = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await getAllVenues();
      setVenues(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold text-white">
              🏟️ Sports Venues
            </h1>

            <p className="text-slate-300 mt-4 text-lg">
              Discover and book the best sports venues near you.
            </p>

          </div>

          {loading ? (
            <div className="text-center text-white text-2xl">
              Loading...
            </div>
          ) : venues.length === 0 ? (
            <div className="text-center text-white text-xl">
              No venues available.
            </div>
          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {venues.map((venue) => (

                <div
                  key={venue._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >

                  <img
                    src={
                      venue.image ||
                      "https://via.placeholder.com/600x400?text=Venue"
                    }
                    alt={venue.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {venue.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      📍 {venue.location}
                    </p>

                    <p className="mt-2">
                      🏅 {venue.sportsType}
                    </p>

                    <p className="mt-2 text-green-600 font-bold text-xl">
                      ₹ {venue.pricePerHour}/Hour
                    </p>

                    <p className="text-gray-600 mt-4 line-clamp-3">
                      {venue.description}
                    </p>

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate(`/venue-details/${venue._id}`)
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/venue/${venue._id}`)
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                      >
                        Book Now
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default VenueList;