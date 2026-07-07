const User = require("../models/User");
const Venue = require("../models/Venue");
const Booking = require("../models/Booking");
const Tournament = require("../models/Tournament");

/*
=========================================
Admin Dashboard
=========================================
*/
const getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalVenues = await Venue.countDocuments();

    const totalBookings = await Booking.countDocuments({
      status: {
        $in: ["Confirmed", "Approved"],
      },
    });

    const totalTournaments =
      await Tournament.countDocuments();

    const latestBookings =
      await Booking.find()
        .populate("user", "name")
        .populate("venue", "name")
        .sort({ createdAt: -1 })
        .limit(5);

    const latestUsers =
      await User.find({
        role: "user",
      })
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      totalUsers,
      totalVenues,
      totalBookings,
      totalTournaments,
      latestBookings,
      latestUsers,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/*
=========================================
Get All Tournaments
=========================================
*/
const getAllTournaments = async (req, res) => {

  try {

    const tournaments = await Tournament.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tournaments);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/*
=========================================
Delete Tournament
=========================================
*/
const deleteTournament = async (req, res) => {

  try {

    await Tournament.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Tournament Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};



module.exports = {
  getDashboard,
  getAllTournaments,
  deleteTournament,
};