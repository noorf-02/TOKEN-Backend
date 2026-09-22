const mongoose = require("mongoose");
const Auth = require("../MODEL/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;
    const existingUser = await Auth.findOne({ username });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    } else {
      const userSignup = await Auth.create({
        fullname: fullname,
        email: email,
        username: username,
        password: hashedPassword,
      });
      const token = jwt.sign(
        {
          id: userSignup._id,
          name: userSignup.fullname,
          email: userSignup.email,
          username: userSignup.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );
      return res.status(201).json({
        message: "User Signed Up",
        user: userSignup,
        token: token,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: "Error during sign in",
      error: error.message,
    });
  }
};

const tokenDecoded = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(201).json({
      message: "Token does not exist.",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("TOKEN:", token);
  console.log("DECODED:", decoded);

  return res.status(201).json({
    message: "Token decoded successfully",
    decoded: decoded,
  });
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await Auth.findOne({ username });
  if (!existingUser) {
    return res.status(401).json({
      message: "User doesn't exist. Login first.",
    });
  }
  const matchedPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchedPassword) {
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

module.exports = { signUp, logIn, tokenDecoded };
