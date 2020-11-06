const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./logger");

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  poolSize: 50,
  useNewUrlParser: true,
  autoIndex: false,
  useFindAndModify: false,
};

const db = mongoose.connect(process.env.DB_CONNECTION, clientOption);

module.exports = db;
