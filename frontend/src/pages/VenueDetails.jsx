import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVenue } from "../api/venueApi";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const res = await getVenue(id);
      setVenue(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-2xl font-bold">Loading Venue...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto py-8 px-5">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <img
            src={
              venue.image ||
              "https://via.placeholder.com/1200x500?text=Venue"
            }
            alt={venue.name}
            className="w-full h-[420px] object-cover"
          />

          <div className="p-8">

            <div className="flex flex-col md:flex-row justify-between">

              <div>

                <h1 className="text-4xl font-bold">
                  {venue.name}
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                  📍 {venue.address}, {venue.city}
                </p>

              </div>

              <div className="mt-5 md:mt-0 text-right">

                <h2 className="text-3xl font-bold text-green-600">
                  ₹ {venue.price}
                </h2>

                <p className="text-gray-500">
                  Per Hour
                </p>

              </div>

            </div>

            <hr className="my-8" />

            {/* Information */}

            <div className="grid md:grid-cols-2 gap-10">

              <div>

                <h2 className="text-2xl font-bold mb-5">
                  Venue Information
                </h2>

                <div className="space-y-4">

                  <p className="text-lg">
                    🏏 <b>Sport :</b> {venue.sport}
                  </p>

                  <p className="text-lg">
                    ⭐ <b>Rating :</b> {venue.rating}
                  </p>

                  <p className="text-lg">
                    📞 <b>Phone :</b> {venue.phone}
                  </p>

                  <p className="text-lg">
                    📍 <b>City :</b> {venue.city}
                  </p>

                </div>

              </div>

              <div>

                <h2 className="text-2xl font-bold mb-5">
                  Description
                </h2>

                <p className="text-gray-600 leading-8">
                  {venue.description}
                </p>

              </div>

            </div>

            <hr className="my-8" />

            {/* Buttons */}

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  navigate(`/venue/${venue._id}`)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                📅 Book Now
              </button>

              {venue.mapLink && (
                <a
                  href={venue.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  🗺 View on Google Maps
                </a>
              )}

              <button
                onClick={() => navigate("/venues")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold"
              >
                All Venues
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VenueDetails;