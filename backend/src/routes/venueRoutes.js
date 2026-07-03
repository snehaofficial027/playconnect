const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadVenue");

const {
  addVenue,
  getAllVenues,
  getVenue,
  updateVenue,
  deleteVenue,
  searchVenue
} = require("../controllers/venueController");

// Routes
router.post(
  "/",
  upload.single("image"),
  addVenue
);
router.get("/", getAllVenues);
router.get("/search", searchVenue);
router.get("/:id", getVenue);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);

module.exports = router;