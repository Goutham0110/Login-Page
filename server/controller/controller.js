const { User } = require("../models/models");
const { LoginRecords } = require("../models/models");

exports.createUser = async (req, res) => {
  try {
    const userExist = await User.find({ mail: req.body.mail });
    if (userExist.length) {
      return res.status(400).json({
        status: "failure",
        message: "user already exists",
      });
    }
    const user = await User.create(req.body);
    return res.status(200).json({
      staus: "success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userExist = await User.find({ mail: req.body.mail });
    if (!userExist.length) {
      return res.status(404).json({
        status: "failure",
        message: "Invalid mail id, sign up",
      });
    }

    const passwordMatch = await User.find({
      mail: req.body.mail,
      password: req.body.password,
    });
    if (!passwordMatch.length) {
      return res.status(404).json({
        status: "failure",
        message: "Incorrect password",
      });
    }
    const loginRecord = await LoginRecords.create(req.body);
    return res.status(200).json({
      staus: "success",
      data: loginRecord,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const profileInfo = await User.findOne({ mail: req.params.profile });
    if (!profileInfo) {
      return res.status(404).json({
        status: "failure",
        message: "user doesn't exist",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: profileInfo,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
