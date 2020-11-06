const express = require("express");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const userSchema = require("../vaildations/user.vaildation");

const router = express.Router();

router
  .route("/register")
  .post(validate(userSchema.register, "body"), userController.register);

router
  .route("/login")
  .post(validate(userSchema.login, "body"), userController.login);

module.exports = router;
