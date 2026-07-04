import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  sendMessage,
  getMessages,
} from "../api/messageApi";

import socket from "../socket";

function Chat() {

  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const playerName =
    location.state?.playerName || "Player";

  const playerImage =
    location.state?.playerImage;

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const [onlineUsers, setOnlineUsers] =
    useState([]);

  const bottomRef =
    useRef(null);

  useEffect(() => {

    loadMessages();

    socket.emit("join", user.id);

    socket.on(
      "receiveMessage",
      (message) => {

        if (
          message.sender === id ||
          message.sender === user.id
        ) {

          setMessages((prev) => [
            ...prev,
            message,
          ]);

        }

      }
    );

    socket.on(
      "onlineUsers",
      (users) => {

        setOnlineUsers(users);

      }
    );

    socket.on(
      "typing",
      (data) => {

        if (
          data.senderId === id
        ) {

          setTyping(true);

        }

      }
    );

    socket.on(
      "stopTyping",
      (data) => {

        if (
          data.senderId === id
        ) {

          setTyping(false);

        }

      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );

      socket.off(
        "onlineUsers"
      );

      socket.off("typing");

      socket.off(
        "stopTyping"
      );

    };

  }, [id]);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const loadMessages =
    async () => {

      try {

        const res =
          await getMessages(id);

        setMessages(
          res.data.messages
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSend =
    async () => {

      if (!text.trim())
        return;

      try {

        const res =
          await sendMessage(
            id,
            text
          );

        socket.emit(
          "sendMessage",
          {
            ...res.data.message,
            receiverId: id,
          }
        );

        setMessages((prev) => [
          ...prev,
          res.data.message,
        ]);

        setText("");

        socket.emit(
          "stopTyping",
          {
            senderId: user.id,
            receiverId: id,
          }
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* HEADER */}

      <div className="bg-white shadow-md px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4 sticky top-0 z-10">

        <button
          onClick={() =>
            navigate("/connections")
          }
          className="text-xl sm:text-2xl"
        >
          ⬅️
        </button>

        <img
          src={
            playerImage ||
            `https://ui-avatars.com/api/?name=${playerName}`
          }
          alt=""
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">

          <h2 className="font-bold text-base sm:text-lg truncate">
            {playerName}
          </h2>

          <p
            className={`text-xs sm:text-sm font-semibold ${
              onlineUsers.includes(id)
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {onlineUsers.includes(id)
              ? "🟢 Online"
              : "⚫ Offline"}
          </p>

          {typing && (
            <p className="text-blue-500 text-xs sm:text-sm animate-pulse">
              ✍️ Typing...
            </p>
          )}

        </div>

      </div>

      {/* MESSAGES */}

            {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto bg-slate-100 p-3 sm:p-4 lg:p-6">

        {messages.map((msg) => (

          <div
            key={msg._id}
            className={`flex mb-4 ${
              msg.sender === user.id
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[85%] sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl shadow break-words ${
                msg.sender === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >

              <p className="text-sm sm:text-base">
                {msg.text}
              </p>

              <div className="flex justify-end items-center gap-1 mt-2">

                <p className="text-[10px] sm:text-[11px] opacity-70">

                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                </p>

                {msg.sender === user.id && (

                  <span className="text-[10px] sm:text-[11px]">

                    {msg.read
                      ? "✓✓"
                      : msg.delivered
                      ? "✓✓"
                      : "✓"}

                  </span>

                )}

              </div>

            </div>

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}

      <div className="bg-white border-t p-3 sm:p-4">

        <div className="flex items-center gap-2 sm:gap-3">

          <input
            type="text"
            value={text}
            onChange={(e) => {

              setText(e.target.value);

              socket.emit("typing", {
                senderId: user.id,
                receiverId: id,
              });

              clearTimeout(window.typingTimeout);

              window.typingTimeout =
                setTimeout(() => {

                  socket.emit(
                    "stopTyping",
                    {
                      senderId: user.id,
                      receiverId: id,
                    }
                  );

                }, 1000);

            }}

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                handleSend();

              }

            }}

            placeholder="Type a message..."

            className="flex-1 border rounded-full px-4 sm:px-5 py-3 outline-none text-sm sm:text-base"

          />

          <button

            onClick={handleSend}

            className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-7 py-3 rounded-full font-semibold transition whitespace-nowrap"

          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;