const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

/*
=========================
GOOGLE LOGIN
=========================
*/

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "http://localhost:5173/login",
    session: false,
  }),

  async (req, res) => {

    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

const user = encodeURIComponent(
  JSON.stringify({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    city: req.user.city,
    sport: req.user.sport,
    skillLevel: req.user.skillLevel,
    profileImage: req.user.profileImage,
    bio: req.user.bio,
  })
);

res.redirect(
  `http://localhost:5173/google-success?token=${token}&user=${user}`
);
  }
);

module.exports = router;