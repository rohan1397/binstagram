const mongoose = require("mongoose");

const convertToMongooseObjectID = async (id) => {
  return mongoose.Types.ObjectId(id);
};

module.exports = convertToMongooseObjectID;
