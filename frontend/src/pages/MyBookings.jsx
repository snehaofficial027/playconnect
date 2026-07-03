import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getMyBookings,
  cancelBooking,
} from "../api/bookingApi";

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {

    try {

      const res = await getMyBookings();

      setBookings(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadBookings();

  }, []);

  const handleCancel = async (id) => {

    if (!window.confirm("Cancel this booking?")) return;

    try {

      await cancelBooking(id);

      alert("Booking Cancelled");

      loadBookings();

    } catch (err) {

      console.log(err);

      alert("Something went wrong");

    }

  };

 const downloadReceipt = (booking) => {

  const receiptWindow = window.open("", "", "width=800,height=900");

  receiptWindow.document.write(`
  <html>

  <head>

  <title>PlayConnect Receipt</title>

  <style>

  body{
      font-family:Arial,sans-serif;
      background:#f4f4f4;
      padding:30px;
  }

  .receipt{
      max-width:700px;
      margin:auto;
      background:white;
      border-radius:12px;
      padding:30px;
      border:2px solid #2563eb;
      box-shadow:0 5px 20px rgba(0,0,0,.15);
  }

  h1{
      color:#2563eb;
      text-align:center;
      margin-bottom:5px;
  }

  h3{
      text-align:center;
      color:#666;
      margin-bottom:30px;
  }

  table{
      width:100%;
      border-collapse:collapse;
  }

  td{
      padding:12px;
      border-bottom:1px solid #ddd;
  }

  td:first-child{
      font-weight:bold;
      width:45%;
  }

  .success{
      color:green;
      font-weight:bold;
  }

  .footer{
      text-align:center;
      margin-top:30px;
      color:#666;
  }

  button{
      margin-top:25px;
      width:100%;
      padding:12px;
      border:none;
      border-radius:8px;
      background:#2563eb;
      color:white;
      font-size:16px;
      cursor:pointer;
  }

  @media print{

    button{
      display:none;
    }

    body{
      background:white;
    }

    .receipt{
      box-shadow:none;
    }

  }

  </style>

  </head>

  <body>

  <div class="receipt">

      <h1>🏆 PlayConnect</h1>

      <h3>Venue Booking Receipt</h3>

      <table>

      <tr>
      <td>Receipt No</td>
      <td>PC-${Date.now()}</td>
      </tr>

      <tr>
      <td>Booking ID</td>
      <td>${booking._id}</td>
      </tr>

      <tr>
      <td>Venue</td>
      <td>${booking.venue?.name}</td>
      </tr>

      <tr>
      <td>Booking Date</td>
      <td>${booking.bookingDate}</td>
      </tr>

      <tr>
      <td>Start Time</td>
      <td>${booking.startTime}</td>
      </tr>

      <tr>
      <td>Duration</td>
      <td>${booking.hours} Hour(s)</td>
      </tr>

      <tr>
      <td>Total Amount</td>
      <td>₹ ${booking.totalPrice}</td>
      </tr>

      <tr>
      <td>Status</td>
      <td class="success">${booking.status}</td>
      </tr>

      </table>

      <div class="footer">

      <h3>Thank You For Booking ❤️</h3>

      <p>PlayConnect Sports Booking System</p>

      </div>

      <button onclick="window.print()">

      🖨 Print / Save PDF

      </button>

  </div>

  </body>

  </html>
  `);

  receiptWindow.document.close();

};
  return (

    <>

      <Header />

      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-4xl font-bold text-slate-800">
      📅 My Bookings
    </h1>

    <p className="text-gray-500 mt-2">
      Total Bookings :
      <span className="font-bold text-blue-600 ml-2">
        {bookings.length}
      </span>
    </p>

  </div>

</div>

         <div className="bg-white rounded-3xl shadow-2xl overflow-x-auto border border-slate-200">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Venue
                  </th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Hours</th>

                  <th>Amount</th>

                  <th>Status</th>

                  <th>Receipt</th>

                  <th>Cancel</th>

                </tr>

              </thead>

              <tbody>
                {bookings.length === 0 ? (

  <tr>

    <td
      colSpan="8"
      className="text-center p-10 text-gray-500"
    >
      No Bookings Found
    </td>

  </tr>

) : (

  bookings.map((booking) => (

    <tr
      key={booking._id}
className="border-b hover:bg-blue-50 transition duration-200 text-center"
    >

      <td className="p-4 text-left">

  <div className="font-bold text-slate-800">
    {booking.venue?.name}
  </div>

</td>

      <td>
        {booking.bookingDate}
      </td>

      <td>
        {booking.startTime}
      </td>

      <td>
        {booking.hours} Hr
      </td>

      <td>

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
    ₹ {booking.totalPrice}
  </span>

</td>

      <td>

      <span
  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
    booking.status === "Approved"
      ? "bg-green-600"
      : booking.status === "Confirmed"
      ? "bg-blue-600"
      : booking.status === "Cancelled"
      ? "bg-red-600"
      : booking.status === "Completed"
      ? "bg-purple-600"
      : "bg-yellow-500"
  }`}
>
  {booking.status || "Confirmed"}
</span>

      </td>

      <td>

        <button
  onClick={() => downloadReceipt(booking)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
>
  📄 Receipt
</button>

      </td>

      <td>
{booking.status !== "Cancelled" &&
 booking.status !== "Completed" ? (

          <button
  onClick={() => handleCancel(booking._id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
>
  ❌ Cancel Booking
</button>

        ) : (

          <span className="text-gray-400">
            —
          </span>

        )}

      </td>

    </tr>

  ))

)}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

};

export default MyBookings;