const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

  createBooking,

  getMyBookings,

  getAllBookings,

  updateBookingStatus,

  cancelBooking,

   getBookedSlots,

} = require("../controllers/bookingController");

// User

router.post("/", authMiddleware, createBooking);

router.get("/my", authMiddleware, getMyBookings);

router.put(
  "/:id/cancel",
  authMiddleware,
  cancelBooking
);

// Admin

router.get("/", authMiddleware, getAllBookings);

router.put(

  "/:id/status",

  authMiddleware,

  updateBookingStatus

);

router.get(
  "/slots/:venueId/:date",
  authMiddleware,
  getBookedSlots
);

module.exports = router;