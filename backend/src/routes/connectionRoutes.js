const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
sendRequest,
getRequests,
acceptRequest,
getConnections,
getSentRequests
} = require(
"../controllers/connectionController"
);

router.post(
  "/send",
  authMiddleware,
  sendRequest
);

router.get(
  "/requests",
  authMiddleware,
  getRequests
);

router.put(
  "/accept/:id",
  authMiddleware,
  acceptRequest
);

router.get(
  "/connections",
  authMiddleware,
  getConnections
);

router.get(
"/sent-requests",
authMiddleware,
getSentRequests
);

router.get(
"/sent",
authMiddleware,
getSentRequests
);

module.exports = router;