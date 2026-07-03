const Connection =
require("../models/Connection");

const Message =
require("../models/Message");

const getNotifications =
async (req, res) => {

try {

const requests =
await Connection.countDocuments({

receiver: req.user.id,
status: "pending",

});

const messages =
await Message.countDocuments({

receiver: req.user.id,
read: false,

});

res.status(200).json({

success: true,

requests,

messages,

total:
requests + messages,

});

} catch (error) {

res.status(500).json({

success: false,
message: error.message,

});

}

};

module.exports = {
getNotifications,
};