const mongoose = require("mongoose");
const Auth = require("../MODEL/auth");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;
    const existingUser = await Auth.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    } else {
      const userSignup = await Auth.create({
        fullname: fullname,
        email: email,
        username: username,
        password: password,
      });
      return res.status(201).json({
        message: "User Signed Up",
        user: userSignup,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: "Error during sign in",
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await Auth.findOne({ username });
  if (!existingUser) {
    return res.status(401).json({
      message: "User doesn't exist. Login first.",
    });
  }
  if (existingUser.password !== password) {
    return res.status(400).json({
      message: "Username or Password incorrect",
    });
  } else {
    return res.status(201).json({
      message: "User logged in successfully.",
      user: existingUser,
    });
  }
};

module.exports = { signUp, logIn };
