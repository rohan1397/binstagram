const app = require("./app");
require("dotenv").config();
const logger = require("./config/logger");

app.listen(process.env.PORT);
logger.info(`Server ready at http://localhost:${process.env.PORT}/api`);
