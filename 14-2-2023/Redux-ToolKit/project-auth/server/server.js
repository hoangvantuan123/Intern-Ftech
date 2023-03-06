const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routers/register");
const login = require("./routers/login");
const admin = require('./routers/admin');
const userRouter = require('./routers/users');
const postRouter = require('./routers/post');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/admin", admin);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

mongoose.set('strictQuery', true);
const MONGO_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/data';
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}...`);
});
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));


  