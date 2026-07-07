const User = require("../models/User");
const Connection = require("../models/Connection");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/*
=================================
UPDATE PROFILE
=================================
*/
const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.city = req.body.city;
    user.sport = req.body.sport;
    user.skillLevel = req.body.skillLevel;
    user.bio = req.body.bio;

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "playconnect_profiles",
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

      user.profileImage = result.secure_url;

    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=================================
GET SINGLE PLAYER
=================================
*/
const getPlayerById = async (req, res) => {
  try {

    const player = await User.findById(req.params.id);

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      player,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
=================================
GET ALL PLAYERS
=================================
*/
const getAllPlayers = async (req, res) => {
  try {

    const players = await User.find({
      role: "user",
    }).select("-password");

    res.status(200).json({
      success: true,
      players,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=================================
GET PROFILE
=================================
*/
const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=================================
ADMIN - GET ALL USERS
=================================
*/
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find({
      role: "user",
    }).select("-password");

    res.json(users);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
=================================
ADMIN - DELETE USER
=================================
*/
const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
=================================
ADMIN - CHANGE ROLE
=================================
*/
const changeRole = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
      }
    );

    res.json(user);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

module.exports = {
  updateProfile,
  getAllPlayers,
  getProfile,
  getPlayerById,
  getAllUsers,
  deleteUser,
  changeRole,
};