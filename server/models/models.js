const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mail: String,
  country: String,
  password: String,
  signupDate: { type: Date, default: Date.now },
});

const loginSchema = new mongoose.Schema({
  username: String,
  loginTime: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);
const LoginRecordsModel = mongoose.model("LoginRecords", loginSchema);

module.exports = { User: UserModel, LoginRecords: LoginRecordsModel };

//make time stamp better
