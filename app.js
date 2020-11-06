const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", routes);
app.use((req, res, next) => {
  res.status(404).json({
    error: "Page Not Found",
  });
});

module.exports = app;
