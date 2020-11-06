const Post = require("../models/posts/post.model");
const User = require("../models/users/user.model");

const createPost = async (req, res) => {
  const { user } = req;
  const { caption, image } = req.body;
  const isUser = await User.findById(user.id);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    let post = {
      caption,
      image,
      userId: user.id,
    };
    post = new Post(post);
    const createdPost = await post.save();
    if (createdPost) {
      res.status(201).json({ success: true, createdPost });
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};
const likeThePost = async (req, res) => {
  const { user } = req;
  const { postId } = req.body;
  const isUser = await User.findById(user.id);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const likePost = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 }, $push: { likedBy: user.id } }
    );

    if (likePost) {
      res.status(201).json({ success: true, likePost });
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { createPost, likeThePost };
