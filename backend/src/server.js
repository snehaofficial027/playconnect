require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const passport = require("passport");
const session = require("express-session");

require("./config/googleAuth");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const messageRoutes = require("./routes/messageRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const venueRoutes = require("./routes/venueRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// IMPORTANT
app.set("io", io);

/*
=========================
MIDDLEWARES
=========================
*/

app.use(
  session({
    secret: "playconnectsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

/*
=========================
MONGODB
=========================
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

/*
=========================
TEST ROUTE
=========================
*/

app.get("/", (req, res) => {
  res.send("PlayConnect API Running 🚀");
});

/*
=========================
API ROUTES
=========================
*/

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/connection", connectionRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/tournament", tournamentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);


/*
=========================
SOCKET.IO
=========================
*/

const onlineUsers = {};
io.on("connection", (socket) => {
  socket.on("typing", (data) => {

  io.to(data.receiverId).emit("typing", {
    senderId: data.senderId,
  });

});

socket.on("stopTyping", (data) => {

  io.to(data.receiverId).emit("stopTyping", {
    senderId: data.senderId,
  });

});

  console.log("🟢 User Connected:", socket.id);

  socket.on("join", (userId) => {

    onlineUsers[userId] = socket.id;

    socket.join(userId);

    io.emit("onlineUsers", Object.keys(onlineUsers));

  });

  socket.on("disconnect", () => {

    for (const userId in onlineUsers) {

      if (onlineUsers[userId] === socket.id) {

        delete onlineUsers[userId];

      }

    }

    io.emit("onlineUsers", Object.keys(onlineUsers));

    console.log("🔴 User Disconnected");

  });

});

/*
=========================
SERVER START
=========================
*/

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(`🚀 Server Running on Port ${PORT}`);

});