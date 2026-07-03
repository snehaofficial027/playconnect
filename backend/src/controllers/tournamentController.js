const Tournament =
require("../models/Tournament");

/*
=========================
CREATE TOURNAMENT
=========================
*/
const createTournament = async (req, res) => {

  try {

    const tournament =
      await Tournament.create({

        title: req.body.title,
        sport: req.body.sport,
        city: req.body.city,
        date: req.body.date,
        fee: req.body.fee,
        maxPlayers: req.body.maxPlayers,
        description: req.body.description,
        createdBy: req.user.id,
        participants: []

      });

    res.status(201).json({
      success: true,
      tournament
    });

  } catch (error) {

    console.log("TOURNAMENT ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

/*
=========================
GET ALL TOURNAMENTS
=========================
*/

const getTournaments =
async (req, res) => {

try {

const tournaments =
await Tournament.find()
.populate(
"createdBy",
"name"
);

res.status(200).json({
success: true,
tournaments,
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

const getTournamentById = async (req,res) => {

  try {

    const tournament =
      await Tournament.findById(req.params.id)
      .populate("participants","name profileImage city");

    if(!tournament){
      return res.status(404).json({
        message:"Tournament not found"
      });
    }

    res.status(200).json({
      success:true,
      tournament
    });

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

/*
=========================
JOIN TOURNAMENT
=========================
*/

const joinTournament =
async (req, res) => {

try {

const tournament =
await Tournament.findById(
req.params.id
);

if (
  tournament.maxPlayers &&
  tournament.participants.length >=
  tournament.maxPlayers
) {

  return res.status(400).json({
    message:
      "Tournament Full",
  });

}

if (
!tournament.participants
) {
tournament.participants = [];
}

const alreadyJoined =
tournament.participants.some(
(id) =>
id.toString() ===
req.user.id
);

if (alreadyJoined) {

return res.status(400).json({
message:
"Already Joined",
});

}

tournament.participants.push(
req.user.id
);

await tournament.save();

res.status(200).json({
success: true,
message:
"Tournament Joined Successfully",
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

/*
=========================
MY TOURNAMENTS
=========================
*/

const getMyTournaments =
async (req, res) => {

try {

const tournaments =
await Tournament.find({

participants:
req.user.id,

});

res.status(200).json({
success: true,
tournaments,
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

// =========================
// ADMIN - ALL TOURNAMENTS
// =========================

const getAllTournamentsAdmin = async (req, res) => {

  try {

    const tournaments = await Tournament.find()
      .populate("createdBy", "name email")
      .populate("participants", "name");

    res.json({
      success: true,
      tournaments,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};


// =========================
// DELETE TOURNAMENT
// =========================

const deleteTournament = async (req, res) => {

  try {

    await Tournament.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Tournament Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

module.exports = {
  createTournament,
  getTournaments,
  getTournamentById,
  joinTournament,
  getMyTournaments,
  getAllTournamentsAdmin,
  deleteTournament,
};