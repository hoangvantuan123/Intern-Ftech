const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routers/register");
const login = require("./routers/login");
const admin = require("./routers/admin");
const userRouter = require("./routers/users");
const postRouter = require("./routers/post");
const imageRouter = require("./routers/imagePost");
const messageRouter = require("./routers/message");
const accountRouter = require("./routers/accountStatus");
const logoutRouter = require("./routers/logout")
const Message = require("./models/Message");
const { User } = require("./models/user");
const rooms = ["general", "tech", "finance", "crypto"];
const session = require('express-session');
///
const app = express();
/// Tạo socket.io để kết nối real-time
/// Code chat box

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({ secret: 'server' }));
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/admin", admin);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/images", imageRouter);
app.use("/api/messages", messageRouter);
app.use("/api/accountStatus", accountRouter);
app.use("/api/logout", logoutRouter);

mongoose.set("strictQuery", true);
const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/data";
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

const server = require("http").createServer(app);
const PORT = 5000;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");
    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];
    return date1 < date2 ? -1 : 1;
  });
}

io.on("connection", (socket) => {
  // Lắng nghe sự kiện "newData"
  socket.on("newData", async (newData) => {
    const data = new Message({ content: newData });
    await data.save(); // Lưu trữ dữ liệu vào kho MongoDB
    io.emit("newData", newData); // Phát sóng dữ liệu mới tới toàn bộ client kết nối
  });

  // Gửi toàn bộ dữ liệu chat cho client đầu tiên khi kết nối thành công
  socket.on("initial-data", async () => {
    // Lấy toàn bộ dữ liệu chat trong DB
    const allMessages = await Message.find({}).sort({ createdAt: 1 });
    // Gửi dữ liệu chat
    socket.emit("all-data", allMessages);
  });
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });


  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });


  // Xử lý khi server nhận được yêu cầu đăng xuất
  socket.on("logout", async (data) => {
    try {
      const { _id, newMessages } = data;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      io.emit("user-logged-out", { userId: _id, members: members });
    } catch (e) {
      console.log(e);
    }
  });
});
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

/// Tạo socket.io để kết nối real-time
/// Code chat box
/// Message

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}...`);
});
