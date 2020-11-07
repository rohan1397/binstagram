const mongoose = require("mongoose");

const convertToMongooseObjectID = async (user) => {
  return mongoose.Types.ObjectId(user);
};

module.exports = convertToMongooseObjectID;
