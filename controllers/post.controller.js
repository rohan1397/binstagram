const Post = require("../models/posts/post.model");
const User = require("../models/users/user.model");
const authenticateUser = require("../helpers/authUser");
const convertToMongooseObjectID = require("../helpers/convertToObjectId");

const createPost = async (req, res) => {
  const { user } = req;
  const { caption, image } = req.body;
  const isUser = authenticateUser(User, user);
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
  const isUser = authenticateUser(User, user);
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

const getAllPost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const posts = await Post.find({}, { createdAt: 0, updatedAt: 0 });
    if (posts) {
      res.status(200).json({ success: true, posts });
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

const getMyPost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const posts = await Post.find(
      { userId: user.id },
      { createdAt: 0, updatedAt: 0 }
    );
    if (posts) {
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

const getOthersPost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const posts = await Post.find(
      { userId: { $ne: user.id } },
      { createdAt: 0, updatedAt: 0 }
    );
    if (posts) {
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

const getSinglePost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  const { postId } = req.params;
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const post = await Post.findById(postId);
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

const deleteLikeFromPost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  const { postId } = req.params;
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const deletelikeFromPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: -1 }, $pull: { likedBy: user.id } }
    );
    if (deletelikeFromPost) {
      res.status(201).json({ success: true, deletelikeFromPost });
    }
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

const allUserlikeThePost = async (req, res) => {
  const { user } = req;
  const isUser = authenticateUser(User, user);
  try {
    if (!isUser) {
      res.status(401).json({ message: "User not found" });
    }
    const users = await Post.aggregate([
      { $match: { userId: { $ne: await convertToMongooseObjectID(user.id) } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      { $unwind: { path: "$users" } },
      {
        $project: {
          image: 1,
          likes: 1,
          caption: 1,
          users: { userName: 1 },
        },
      },
    ]);
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  createPost,
  likeThePost,
  getAllPost,
  getMyPost,
  getOthersPost,
  getSinglePost,
  deleteLikeFromPost,
  allUserlikeThePost,
};
