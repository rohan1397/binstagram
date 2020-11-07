const express = require("express");
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const router = express.Router();

router.use("/auth", userRoute);
router.use("/user", postRoute);

module.exports = router;
