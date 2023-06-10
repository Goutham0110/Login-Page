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
    key: "userCookie",
    secret: "cookieSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.static("public"));

//APIs
app.post("/signup", createUser);
app.post("/login", loginUser);
app.get("/login/status", loginStatus);
app.get("/:profile", userInfo);

//test
app.get("/status", (req, res) => {
  res.send("Server Alive");
});

app.listen(5000, () => {
  console.log("server running on http://localhost:5000");
});
