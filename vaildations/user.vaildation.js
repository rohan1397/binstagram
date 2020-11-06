const Joi = require("joi");

const UserSchema = {
  register: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  }),
  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  }),
  updateProfile: Joi.object().keys({
    userName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
  }),
};

module.exports = UserSchema;
