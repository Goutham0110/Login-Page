const { User } = require("../models/models");
const { LoginRecords } = require("../models/models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const saltRounds = parseInt(process.env.SALTROUNDS);

exports.createUser = async (req, res) => {
  try {
    const userExist = await User.find({ mail: req.body.mail });
    if (userExist.length) {
      return res.status(400).json({
        status: "failure",
        message: "user already exists",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    signupData = {
      name: req.body.name,
      mail: req.body.mail,
      passwordHash: hash,
    };
    let user = await User.create(signupData);

    return res.status(200).json({
      success: true,
      message: "created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error",
      error: err.message,
    });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const profileInfo = await User.findOne({ mail: req.params.profile });
    if (!profileInfo) {
      return res.status(404).json({
        success: false,
        message: "user doesn't exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: profileInfo,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.find({ mail: req.body.mail });
    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: "Invalid mail id, sign up",
      });
    }

    await bcrypt.compare(
      req.body.password,
      user[0].passwordHash,
      async function (err, result) {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: "Incorrect password",
          });
        } else {
          const loginRecord = await LoginRecords.create(req.body);
          return res.status(200).json({
            msg: "You have logged in successfully",
            loginRecord: loginRecord,
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.loginStatus = async (req, res) => {};
