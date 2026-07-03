const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createTournament,
  getTournaments,
  joinTournament,
  getMyTournaments,
  getTournamentById
} = require("../controllers/tournamentController");

router.post(
"/create",
authMiddleware,
createTournament
);

router.get(
"/all",
getTournaments
);

router.put(
"/join/:id",
authMiddleware,
joinTournament
);

router.get(
"/my",
authMiddleware,
getMyTournaments
);

router.get(
  "/:id",
  getTournamentById
);

module.exports = router;