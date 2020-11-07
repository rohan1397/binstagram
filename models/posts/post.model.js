const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "users",
      required: true,
    },
    image: {
      type: "String",
      require: true,
      trim: true,
    },
    caption: {
      type: "String",
      require: true,
      trim: true,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "users",
        trim: true,
      },
    ],
    likes: { type: "Number", default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", postSchema);
