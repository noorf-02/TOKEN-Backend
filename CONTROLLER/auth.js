const mongoose = require("mongoose");
const Auth = require("../MODEL/auth");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;
    const userSignup = await Auth.create({
      fullname: fullname,
      email: email,
      username: username,
      password: password,
    });
    res.status(201).json({
      message: "User Signed Up",
      user: userSignup,
    });
  } catch {
    res.status(501).json({
      message: "Error during sign in",
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  res.send("Log In");
};

module.exports = { signUp, logIn };
