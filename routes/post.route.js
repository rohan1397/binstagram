const express = require("express");
const postController = require("../controllers/post.controller");
const validate = require("../middlewares/validate");
const postSchema = require("../vaildations/post.vaildation");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router
  .route("/posts")
  .post(
    validate(postSchema.createPost, "body"),
    isAuth,
    postController.createPost
  );

router
  .route("/posts/likes")
  .post(
    validate(postSchema.likeThePost, "body"),
    isAuth,
    postController.likeThePost
  );

module.exports = router;
