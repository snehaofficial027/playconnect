const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

  city: String,

  sport: String,

  skillLevel: String,

  bio: String,

  profileImage: String,
  

  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

},
{
  timestamps: true,
});

module.exports =
mongoose.model(
  "User",
  userSchema
);