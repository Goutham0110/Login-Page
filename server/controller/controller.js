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
          const userSession = {
            email: user[0].mail,
          }; 
          req.session.userSession = userSession; // attach user session to session object from express-session
          return res.status(200).json({
            msg: "You have logged in successfully",
            userSession: userSession,
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
    req.session.destroy((error) => {
      if (error) throw error;
      res.clearCookie("userSession"); // cleaning the cookies from the user session
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.loginStatus = async (req, res) => {
  if (req.session.userSession) {
    return res.status(200).json({
      success: true,
      message: "Authorized",
      mail: req.session.userSession.email,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
};
