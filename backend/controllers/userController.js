const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userController = {
  // REGISTER USER
  register: asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    // console.log({ username, email, password });

    // validation
    if (!username || !email || !password) {
      throw new Error("Please all fields are required.");
    }

    // check if user already exist by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exist...");
    }

    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user and saved to DB
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
    });

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //   //LOGIN USER
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check valid email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Login credential...");
    }

    //cmapare password with hashed
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new Error("Invalid Login credential...");
    }

    //TOKEN JWT enerate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    //send the response
    res.status(200).json({
      message: "Login Sucessfully",
      username: user.username,
      token,
      email: user.email,
      role: user.role,
      id: user._id,
    });
  }),
};

module.exports = userController;
