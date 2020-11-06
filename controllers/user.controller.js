const User = require("../models/users/user.model");
const bcrypt = require("bcrypt");
const { authenticatePassword } = require("../helpers/authPassword");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const data = req.body;
  try {
    const existing_user = await User.findOne({ email: data.email });
    if (existing_user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      data.password = await bcrypt.hash(data.password, 12);
      let user = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      };
      user = new User(user);
      const registeredUser = await user.save();
      if (registeredUser) {
        res
          .status(201)
          .json({ success: true, user: { ...user._doc, password: null } });
      }
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
};

const login = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });

  if (!user) {
    res.status(401).json({ message: "Invalid Credentials!!" });
  } else {
    const authenticatedPassword = await authenticatePassword(
      data.password,
      user.password
    );
    if (authenticatedPassword) {
      const authUser = { id: user._id, email: user.email };
      const accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
      });
      res.status(201).json({
        success: true,
        user: { ...user._doc, password: null },
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid Password!!" });
    }
  }
};

const updateProfile = async (req, res) => {
  const { user } = req;
  const data = req.body;
  const isUser = await User.findById(user.id);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const updateUserProfile = await User.findByIdAndUpdate(
      { _id: user.id },
      data
    );
    res.status(204).json({});
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { register, login, updateProfile };
