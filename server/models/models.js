const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mail: { type: String, required: true },
  country: { type: String, required: true },
  passwordHash: { type: String, required: true },
  signupDate: { type: Date, default: Date.now },
});

const loginSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", userSchema);
const LoginRecordsModel = mongoose.model("LoginRecords", loginSchema);

module.exports = { User: UserModel, LoginRecords: LoginRecordsModel };

//make time stamp better
