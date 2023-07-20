const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
var cookieParser = require("cookie-parser");

const {
  createUser,
  loginUser,
  userInfo,
  loginStatus,
  logoutUser,
  authenticateToken
} = require("./controller/controller");

//db connection
const url = process.env.MONGODB_CONNECTION_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database connected successfully");
});

//middleware
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//APIs
app.post("/signup", createUser);
app.post("/login", loginUser);
app.get("/login/status", loginStatus);
app.post("/logout", logoutUser);
app.get("/profile/:profile", userInfo);

//test
app.get("/status", (req, res) => {
  res.send("Server Alive");
});

app.listen(process.env.PORT, () => {
  console.log("server running on http://localhost:5000");
});
