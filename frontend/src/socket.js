import { io } from "socket.io-client";

const socket = io("https://playconnect-i4ku.onrender.com");

export default socket;