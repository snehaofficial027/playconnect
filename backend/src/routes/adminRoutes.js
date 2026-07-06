  const express = require("express");
  const router = express.Router();

  const authMiddleware = require("../middleware/authMiddleware");

  const {
    getDashboard,
    getAllTournaments,
    deleteTournament,
  } = require("../controllers/adminController");

  /*
  =====================================
  Dashboard
  =====================================
  */

  router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
  );

  /*
  =====================================
  Tournament Management
  =====================================
  */

  // Get All Tournaments
  router.get(
    "/tournaments",
    authMiddleware,
    getAllTournaments
  );

  // Delete Tournament
  router.delete(
    "/tournaments/:id",
    authMiddleware,
    deleteTournament
  );

  module.exports = router;