const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();
app.use(express.json());

app.use(cors());

module.exports = app;
