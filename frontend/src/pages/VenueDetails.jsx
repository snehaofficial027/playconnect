import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVenue } from "../api/venueApi";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedTime, setSelectedTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const res = await getVenue(id);
      setVenue(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // dummy booked slots (replace with API later)
  const bookedSlots = ["10:00", "12:00", "18:00"];

  const handleBook = () => {
    if (!selectedTime) {
      alert("Select time slot first");
      return;
    }

    if (bookedSlots.includes(selectedTime)) {
      setShowPopup(true);
      return;
    }

    alert("Booking Success 🚀");
    navigate("/my-bookings");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold">
          Loading Venue...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-5">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-5 py-2 rounded-lg"
        >
          ← Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Image */}
          <img
            src={
              venue.image ||
              "https://via.placeholder.com/1200x500?text=Venue"
            }
            alt={venue.name}
            className="w-full h-52 sm:h-80 md:h-[420px] object-cover"
          />

          <div className="p-5 sm:p-8">

            {/* Title */}
            <div className="flex flex-col md:flex-row justify-between gap-4">

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {venue.name}
                </h1>

                <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-lg">
                  📍 {venue.address}, {venue.city}
                </p>
              </div>

              <div className="text-left md:text-right">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₹ {venue.price}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  Per Hour
                </p>
              </div>

            </div>

            <hr className="my-6 sm:my-8" />

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
                  Venue Information
                </h2>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg">

                  <p>🏏 <b>Sport :</b> {venue.sport}</p>
                  <p>⭐ <b>Rating :</b> {venue.rating}</p>
                  <p>📞 <b>Phone :</b> {venue.phone}</p>
                  <p>📍 <b>City :</b> {venue.city}</p>

                </div>

              </div>

              <div>

                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
                  Description
                </h2>

                <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
                  {venue.description}
                </p>

              </div>

            </div>

            <hr className="my-6 sm:my-8" />

            {/* TIME SLOT UI */}
            <div className="mb-6">

              <h2 className="text-xl font-bold mb-3">
                Select Time Slot
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">

                {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map(
                  (time) => {
                    const isBooked = bookedSlots.includes(time);

                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        disabled={isBooked}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                          isBooked
                            ? "bg-red-100 text-red-500 cursor-not-allowed"
                            : selectedTime === time
                            ? "bg-green-600 text-white"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">

              <button
                onClick={handleBook}
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold w-full sm:w-auto"
              >
                📅 Book Now
              </button>

              {venue.mapLink && (
                <a
                  href={venue.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-center w-full sm:w-auto"
                >
                  🗺 View Map
                </a>
              )}

              <button
                onClick={() => navigate("/venues")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold w-full sm:w-auto"
              >
                All Venues
              </button>

            </div>

          </div>
        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

            <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full">

              <h2 className="text-xl font-bold text-red-600">
                Slot Already Booked ❌
              </h2>

              <p className="mt-2 text-gray-600">
                Please choose another time slot
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                OK
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default VenueDetails;