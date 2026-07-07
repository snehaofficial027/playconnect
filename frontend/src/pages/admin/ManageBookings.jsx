import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/bookingApi";

const ManageBookings = () => {

  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
     const res = await getAllBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);

      alert(`Booking ${status}`);

      loadBookings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Manage Bookings
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4">Player</th>

                <th>Venue</th>

                <th>Date</th>

                <th>Time</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking._id}
                  className="border-b text-center"
                >

                  <td className="p-4">
                    {booking.user?.name}
                  </td>

                  <td>
                    {booking.venue?.name}
                  </td>

                  <td>
                    {booking.bookingDate}
                  </td>

                  <td>
                    {booking.startTime} ({booking.hours} Hr)
                  </td>

                  <td className="font-bold text-green-600">
                     ₹ {booking.totalPrice}
                  </td>
                  
<td>
  <span
    className={`px-3 py-2 rounded font-semibold ${
      booking.status === "Confirmed"
        ? "bg-yellow-500 text-white"
        : booking.status === "Approved"
        ? "bg-green-600 text-white"
        : booking.status === "Rejected"
        ? "bg-red-600 text-white"
        : "bg-gray-500 text-white"
    }`}
  >
    {booking.status}
  </span>
</td>

<td>
  {booking.status === "Cancelled" ? (
    <span className="text-red-600 font-bold">
      Cancelled by User
    </span>
  ) : (
    <>
      <button
        onClick={() =>
          changeStatus(booking._id, "Approved")
        }
        className="bg-green-600 text-white px-3 py-2 rounded mr-2"
      >
        Approve
      </button>

      <button
        onClick={() =>
          changeStatus(booking._id, "Rejected")
        }
        className="bg-red-600 text-white px-3 py-2 rounded"
      >
        Reject
      </button>
    </>
  )}
</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageBookings;