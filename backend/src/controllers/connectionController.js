const Connection = require("../models/Connection");

/*
=================================
SEND REQUEST
=================================
*/
const sendRequest = async (
  req,
  res
) => {
  try {

    const { receiverId } =
      req.body;

    if (
      receiverId === req.user.id
    ) {
      return res.status(400).json({
        message:
          "You cannot send request to yourself",
      });
    }

    const existing =
await Connection.findOne({
  $or: [
    {
      sender: req.user.id,
      receiver: receiverId,
    },
    {
      sender: receiverId,
      receiver: req.user.id,
    },
  ],
});

if (existing) {
  return res.status(400).json({
    message:
      existing.status === "accepted"
        ? "Already Connected"
        : "Request already exists",
  });
}

    if (existing) {
      return res.status(400).json({
        message:
          "Request already sent",
      });
    }

    const request =
      await Connection.create({
        sender: req.user.id,
        receiver: receiverId,
      });

    res.status(201).json({
      success: true,
      request,
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
GET REQUESTS
=================================
*/

const getRequests = async (
req,
res
) => {

try {

const requests =
await Connection.find({

receiver:req.user.id,
status:"pending"

}).populate(
"sender",
"name city sport skillLevel profileImage"
);

res.status(200).json({
success:true,
requests
});

} catch(error) {

res.status(500).json({
message:error.message
});

}

};

const getSentRequests =
async (req,res)=>{

try{

const requests =
await Connection.find({

sender:req.user.id,
status:"pending"

});

res.status(200).json({
success:true,
requests
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};

/*
=================================
ACCEPT REQUEST
=================================
*/
const acceptRequest = async (
  req,
  res
) => {
  try {

    const connection =
      await Connection.findById(
        req.params.id
      );

    if (!connection) {
      return res.status(404).json({
        message:
          "Request not found",
      });
    }

    connection.status =
      "accepted";

    await connection.save();

    res.status(200).json({
      success: true,
      message:
        "Request Accepted",
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
GET CONNECTIONS
=================================
*/
const getConnections = async (
  req,
  res
) => {
  try {

    const connections =
      await Connection.find({
        status: "accepted",
        $or: [
          {
            sender: req.user.id,
          },
          {
            receiver: req.user.id,
          },
        ],
      })
      .populate(
        "sender",
        "name city sport profileImage"
      )
      .populate(
        "receiver",
        "name city sport profileImage"
      );

    const uniqueConnections = [];
    const seen = new Set();

    connections.forEach((conn) => {

      const otherUser =
        conn.sender._id.toString() ===
        req.user.id
          ? conn.receiver
          : conn.sender;

      if (
        !seen.has(
          otherUser._id.toString()
        )
      ) {

        seen.add(
          otherUser._id.toString()
        );

        uniqueConnections.push(conn);

      }

    });

    res.status(200).json({
      success: true,
      connections:
        uniqueConnections,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
sendRequest,
getRequests,
acceptRequest,
getConnections,
getSentRequests
};