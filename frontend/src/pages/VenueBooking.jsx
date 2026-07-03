import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getVenue } from "../api/venueApi";
import {
  createBooking,
  getBookedSlots,
} from "../api/bookingApi";
import { createOrder } from "../api/paymentApi";

const VenueBooking = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);

  const [bookedSlots, setBookedSlots] = useState([]);

  const [booking, setBooking] = useState({
    date: "",
    startTime: "",
    hours: 1,
  });

  useEffect(() => {
    fetchVenue();
  }, []);

  useEffect(() => {

    if (booking.date) {
      loadBookedSlots(booking.date);
    }

  }, [booking.date]);

  const fetchVenue = async () => {

    try {

      const res = await getVenue(id);

      setVenue(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadBookedSlots = async (date) => {

  try {

    const res = await getBookedSlots(id, date);

    if (res.data.success) {
      setBookedSlots(res.data.bookings);
    } else {
      setBookedSlots([]);
    }

  } catch (err) {

    console.log(err);

    setBookedSlots([]);

  }

};

  const handleChange = (e) => {

    setBooking({

      ...booking,

      [e.target.name]: e.target.value,

    });

  };

  const totalPrice = venue
    ? Number(venue.price) * Number(booking.hours)
    : 0;

  const handleBooking = async () => {

    if (!booking.date || !booking.startTime) {

      alert("Please fill all booking details");

      return;

    }

    const selectedStart =
      parseInt(
        booking.startTime.split(":")[0]
      );

    const selectedEnd =
      selectedStart +
      Number(booking.hours);

    const conflict =
      bookedSlots.some((slot) => {

        const start =
          parseInt(
            slot.startTime.split(":")[0]
          );

        const end =
          start +
          Number(slot.hours);

        return (
          selectedStart < end &&
          selectedEnd > start
        );

      });

    if (conflict) {

      alert(
  "❌ This time slot is already booked.\n\nPlease choose another available time."
);

      return;

    }

    try {

      const { data: order } =
        await createOrder(totalPrice);

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "PlayConnect",

        description:
          "Venue Booking",

        order_id: order.id,

        handler: async function () {

  try {

    await createBooking({

      venue: venue._id,

      bookingDate: booking.date,

      startTime: booking.startTime,

      hours: Number(booking.hours),

      totalPrice,

    });

    alert("✅ Payment Successful & Booking Confirmed");

    navigate("/my-bookings");

  } catch (err) {

    console.log(err);

    if (err.response?.data?.message) {

      alert(err.response.data.message);

    } else {

      alert("Booking Failed");

    }

  }

},

prefill: {

  name: JSON.parse(localStorage.getItem("user"))?.name,

  email: JSON.parse(localStorage.getItem("user"))?.email,

},

theme: {

  color: "#2563eb",

},

};

const razor = new window.Razorpay(options);

razor.open();

} catch (err) {

console.log(err);

alert("Payment Failed");

}

};

if (!venue) {

return (

<div className="min-h-screen flex justify-center items-center">

Loading...

</div>

);

}

return (

  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-10 px-4">

    <div className="max-w-5xl mx-auto">

      <button
        onClick={() => navigate("/venues")}
        className="mb-6 bg-white hover:bg-gray-200 text-gray-800 font-semibold px-5 py-3 rounded-xl shadow"
      >
        ← Back to Venues
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <img
          src={
            venue.image ||
            "https://via.placeholder.com/1200x500"
          }
          alt={venue.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-8">

          <h1 className="text-4xl font-bold">
            {venue.name}
          </h1>

          <p className="text-gray-500 mt-3">
            📍 {venue.address}, {venue.city}
          </p>

          <p className="mt-2 text-lg">
            🏅 {venue.sport}
          </p>

          <p className="mt-2 text-lg">
            📞 {venue.phone}
          </p>

          <a
            href={venue.mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            📍 Open in Google Maps
          </a>

          <div className="mt-5 bg-green-100 rounded-xl p-5">

            <h2 className="text-3xl font-bold text-green-700">

              ₹ {venue.price} / Hour

            </h2>

          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-6">

            Booking Details

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="font-semibold">

                Booking Date

              </label>

              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">

                Start Time

              </label>

              <input
                type="time"
                name="startTime"
                value={booking.startTime}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">

                Hours

              </label>

              <select
                name="hours"
                value={booking.hours}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={3}>3 Hours</option>
                <option value={4}>4 Hours</option>
                <option value={5}>5 Hours</option>

              </select>

            </div>

          </div>

          {booking.date && (

  <div className="mt-8">

    <h3 className="text-xl font-bold text-red-600 mb-4">
      🔴 Already Booked Slots
    </h3>

    {bookedSlots.length > 0 ? (

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {bookedSlots.map((slot) => (

          <div
            key={slot._id}
            className="bg-red-600 text-white rounded-xl p-3 text-center"
          >
            <p className="font-bold">
              {slot.startTime}
            </p>

            <p>
              {slot.hours} Hour(s)
            </p>
          </div>

        ))}

      </div>

    ) : (

      <div className="bg-green-100 text-green-700 p-4 rounded-xl font-semibold">

        ✅ No Bookings Yet

      </div>

    )}

  </div>

)}
                    <div className="mt-8 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6 shadow">

            <div className="flex justify-between items-center">

              <span className="text-xl font-semibold">
                Price Per Hour
              </span>

              <span className="text-2xl font-bold text-green-700">
                ₹ {venue.price}
              </span>

            </div>

            <div className="flex justify-between items-center mt-4">

              <span className="text-xl font-semibold">
                Selected Hours
              </span>

              <span className="text-2xl font-bold">
                {booking.hours}
              </span>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between items-center">

              <span className="text-2xl font-bold">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-green-700">
                ₹ {totalPrice}
              </span>

            </div>

          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold transition"
          >
            ✅ Confirm Booking
          </button>

        </div>

      </div>

    </div>

  </div>

);

};

export default VenueBooking;