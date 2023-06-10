const { User } = require("../models/models");
const { LoginRecords } = require("../models/models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const userExist = await User.find({ mail: req.body.mail });
    if (userExist.length) {
      return res.status(400).json({
        status: "failure",
        message: "user already exists",
      });
    }
    let user;
    await bcrypt.hash(
      req.body.password,
      saltRounds,
      async function (err, hash) {
        signupData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          mail: req.body.mail,
          country: req.body.country,
          passwordHash: hash,
        };
        user = await User.create(signupData);
      }
    );
    return res.status(200).json({
      staus: "success",
      message: "created",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "catching err",
      error: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.find({ mail: req.body.mail });
    if (!user.length) {
      return res.status(404).json({
        status: "failure",
        message: "Invalid mail id, sign up",
      });
    }

    await bcrypt.compare(
      req.body.password,
      user[0].passwordHash,
      async function (err, result) {
        if (!result) {
          return res.status(404).json({
            status: "failure",
            message: "Incorrect password",
            data: result,
          });
        } else {
          const loginRecord = await LoginRecords.create(req.body);
          req.session.userCookie = {
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            mail: user[0].mail,
            country: user[0].country,
            signupDate: user[0].signupDate,
            loginTime: loginRecord.loginTime,
          };
          console.log(req.session);
          return res.status(200).json({
            staus: "success",
            data: loginRecord,
          });
        }
      }
    );
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

exports.loginStatus = async (req, res) => {
  try {
    console.log(req.session);
    if (req.session.userCookie) {
      return res.status(200).json({
        loggedIn: true,
        data: req.session.userCookie,
      });
    } else {
      return res.status(200).json({
        loggedIn: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
