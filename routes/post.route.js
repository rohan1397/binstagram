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
  )
  .get(isAuth, postController.getAllPost);

router
  .route("/post/likes")
  .post(
    validate(postSchema.likeThePost, "body"),
    isAuth,
    postController.likeThePost
  )
  .get(isAuth, postController.allUserlikeThePost);

router
  .route("/remove-like/:postId")
  .delete(
    validate(postSchema.likeThePost, "params"),
    isAuth,
    postController.deleteLikeFromPost
  );

router.route("/my-posts").get(isAuth, postController.getMyPost);

router.route("/others-posts").get(isAuth, postController.getOthersPost);

router.route("/posts/:postId").get(isAuth, postController.getSinglePost);

module.exports = router;
