const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { createUser, loginUser, userInfo } = require("./controller/controller");

//db connection
mongoose.connect("mongodb://localhost:27017/CommentLineArticles", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database connected successfully");
});

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//APIs
app.post("/signup", createUser);
app.post("/login", loginUser);
app.get("/:profile", userInfo);

//test
app.get("/status", (req, res) => {
  res.send("Server Alive");
});

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});
