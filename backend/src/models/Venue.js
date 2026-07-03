const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    phone: String,
    description: String,
    mapLink: String,
  },
  {
    timestamps: true,
  }
);

// 👇 IMPORTANT (CommonJS export)
module.exports = mongoose.model("Venue", venueSchema);