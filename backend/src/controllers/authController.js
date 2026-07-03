const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
=====================================
REGISTER USER
=====================================
*/
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check Existing User
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

   const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(201).json({
  success: true,
  message: "Registration successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
     role: user.role,
  },
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=====================================
LOGIN USER
=====================================
*/
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Google Login User Check
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account was created using Google. Please continue with Google Login.",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  city: user.city,
  sport: user.sport,
  skillLevel: user.skillLevel,
  profileImage: user.profileImage,
  bio: user.bio,
},
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
};