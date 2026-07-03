const mongoose = require("mongoose");

const tournamentSchema =
new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  sport: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  fee: {
    type: Number,
    default: 0,
  },

  maxPlayers: {
    type: Number,
    default: 10,
  },

  description: {
    type: String,
    default: "",
  },

  createdBy: {
    type:
      mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  participants: [
    {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model(
  "Tournament",
  tournamentSchema
);