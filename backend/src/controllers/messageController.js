const Message = require("../models/Message");

/*
=========================
SEND MESSAGE
=========================
*/

const sendMessage = async (req, res) => {

  try {

    const { receiverId, text } = req.body;

    if (!text?.trim()) {

      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });

    }

    const message = await Message.create({

sender:req.user.id,

receiver:receiverId,

text,

delivered:true,

read:false,

});

    /*
    =========================
    REALTIME SOCKET
    =========================
    */

    const io = req.app.get("io");

    io.to(receiverId).emit(
      "receiveMessage",
      message
    );

    res.status(201).json({

      success: true,
      message,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

/*
=========================
GET CHAT
=========================
*/

const getMessages = async (req, res) => {

  try {

    const userId = req.user.id;

    const otherUser = req.params.userId;

    const messages = await Message.find({

      $or: [

        {
          sender: userId,
          receiver: otherUser,
        },

        {
          sender: otherUser,
          receiver: userId,
        },

      ],

    }).sort({
      createdAt: 1,
    });

    await Message.updateMany(

      {
        receiver: userId,
        sender: otherUser,
        read: false,
      },

      {
        read: true,
      }

    );

    res.status(200).json({

      success: true,
      messages,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

module.exports = {
  sendMessage,
  getMessages,
};