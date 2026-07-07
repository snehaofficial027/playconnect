const Booking = require("../models/Booking");

// ===============================
// CREATE BOOKING
// ===============================

const createBooking = async (req, res) => {

  try {
    // ===============================
// CHECK SLOT AVAILABILITY
// ===============================

const bookings = await Booking.find({
  venue: req.body.venue,
  bookingDate: req.body.bookingDate,
  status: {
    $in: ["Confirmed", "Approved"],
  },
});

const startHour = parseInt(
  req.body.startTime.split(":")[0]
);

const endHour =
  startHour + Number(req.body.hours);

let conflict = false;

for (const item of bookings) {

  const bookedStart = parseInt(
    item.startTime.split(":")[0]
  );

  const bookedEnd =
    bookedStart + Number(item.hours);

  if (
    startHour < bookedEnd &&
    endHour > bookedStart
  ) {

    conflict = true;

    break;

  }

}

if (conflict) {

  return res.status(400).json({

    success: false,

    message:
      "Selected time slot is already booked.",

  });

}

   const booking = await Booking.create({

      user: req.user.id,

      venue: req.body.venue,

      bookingDate: req.body.bookingDate,

      startTime: req.body.startTime,

      hours: req.body.hours,

      totalPrice: req.body.totalPrice,

      paymentId: req.body.paymentId || "",

      orderId: req.body.orderId || "",

      status: "Confirmed",

    });

    res.status(201).json({

      success: true,

      booking,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};

// ===============================
// MY BOOKINGS
// ===============================

const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
  user: req.user.id,
  status: { $ne: "Cancelled" },
}).populate("venue");


    res.json(bookings);

  } catch (err) {

    res.status(500).json({

      message: err.message,

    });

  }

};

// ===============================
// ADMIN BOOKINGS
// ===============================

const getAllBookings = async (req, res) => {

  try {

   const bookings = await Booking.find()
  .populate("user")
  .populate("venue")
  .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {

    res.status(500).json({

      message: err.message,

    });

  }

};

// ===============================
// UPDATE STATUS (ADMIN)
// ===============================

const updateBookingStatus = async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      {

        status: req.body.status,

      },

      {

        new: true,

      }

    );

    res.json({

      success: true,

      booking,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};

// ===============================
// CANCEL BOOKING
// ===============================

const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

   booking.status = "Cancelled";
await booking.save();

res.json({
  success: true,
  message: "Booking Cancelled Successfully",
  booking,
});
    

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ===============================
// GET BOOKED SLOTS
// ===============================

const getBookedSlots = async (req, res) => {

  try {

    const bookings = await Booking.find({
      venue: req.params.venueId,
      bookingDate: req.params.date,
      status: { $ne: "Cancelled" },
    }).select("startTime hours");

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
  getBookedSlots,
};