const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routers/register");

const products = require("./products");

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/register", register);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});
mongoose.set('strictQuery', true);
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/acc';
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
