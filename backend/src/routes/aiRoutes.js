const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAISuggestion,
} = require("../controllers/aiController");

router.post(
  "/suggestion",
  authMiddleware,
  getAISuggestion
);
  
module.exports = router;