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

const db = mongoose.createConnection(process.env.DB_CONNECTION, clientOption);

db.on("error", () => logger.error("MongoDB Connection Error>> : "));
db.once("open", function () {
  logger.info("client MongoDB Connection ok!");
});

module.exports = {
  db,
};
