const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const upload = require(
  "../middleware/uploadVenue"
);

const {
  updateProfile,
  getAllPlayers,
  getProfile,
  getPlayerById,
  getAllUsers,
  deleteUser,
  changeRole,
} = require("../controllers/userController");

/*
========================
GET PLAYER BY ID
========================
*/

router.get(
  "/player/:id",
  authMiddleware,
  getPlayerById
);

/*
========================
UPDATE PROFILE
========================
*/

router.put(
  "/profile",
  authMiddleware,
  upload.single(
    "profileImage"
  ),
  updateProfile
);

/*
========================
GET ALL PLAYERS
========================
*/

router.get(
  "/players",
  getAllPlayers
);

/*
========================
GET MY PROFILE
========================
*/

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

/*
========================
ADMIN - GET ALL USERS
========================
*/

router.get(
  "/",
  authMiddleware,
  getAllUsers
);

/*
========================
ADMIN - CHANGE ROLE
========================
*/

router.put(
  "/:id/role",
  authMiddleware,
  changeRole
);

/*
========================
ADMIN - DELETE USER
========================
*/

router.delete(
  "/:id",
  authMiddleware,
  deleteUser
);

module.exports = router;