const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const PostSchema = {
  createPost: Joi.object().keys({
    image: Joi.string()
      .uri({ scheme: ["http"] })
      .required(),
    caption: Joi.string().required(),
  }),
  likeThePost: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
};

module.exports = PostSchema;
