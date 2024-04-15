const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const generateToken = require("../configs/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password, avatar } = req.body;

  if (!fullName || !userName || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all required fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    fullName,
    userName,
    email,
    password,
    avatar,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      avatar: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});


// users update
const updateUser = asyncHandler(async (req, res) => {
  const { fullName, password, avatar } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "Product not found" });
    }
    let hashedPassword=""
    if (password) {
      const salt = await bcrypt.genSalt(9);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    console.log("hash",hashedPassword)
    await User.findByIdAndUpdate(
      id,
      { fullName, password:hashedPassword, avatar },
      { new: true }
    );
    res.send("Updated User successfully");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});
module.exports = { registerUser, loginUser, updateUser };
