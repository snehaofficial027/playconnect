const Venue = require("../models/Venue");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Add Venue
const addVenue = async (req, res) => {
  try {

    let imageUrl = "";

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "playconnect_venues",
          },
          (error, result) => {

            if (error) return reject(error);

            resolve(result);

          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);

      });

      imageUrl = result.secure_url;

    }

    const venue = await Venue.create({

      name: req.body.name,
      sport: req.body.sport,
      city: req.body.city,
      address: req.body.address,
      price: req.body.price,
      phone: req.body.phone,
      description: req.body.description,
      mapLink: req.body.mapLink,
      rating: 5,
      image: imageUrl,

    });

    res.status(201).json(venue);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// Get All Venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Venue
const getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Venue
const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(venue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Venue
const deleteVenue = async (req, res) => {

  try {

    await Venue.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Venue Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Search Venue
const searchVenue = async (req, res) => {
  try {
    const { q } = req.query;

    const venues = await Venue.find({
      name: { $regex: q, $options: "i" }
    });

    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addVenue,
  getAllVenues,
  getVenue,
  updateVenue,
  deleteVenue,
  searchVenue
};