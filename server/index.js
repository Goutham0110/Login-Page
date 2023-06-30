const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
var cookieParser = require("cookie-parser");

const {
  createUser,
  loginUser,
  userInfo,
  loginStatus,
  logoutUser,
} = require("./controller/controller");

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
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "a1s2d3f4g5h6",
    name: "userSession", // cookies name to be put in "key" field in postman
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
      sameSite: false,
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: false,
  })
);

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

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});
