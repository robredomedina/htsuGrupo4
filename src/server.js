const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const config = require("./config/config.js");
require("./config/mongo");

const path = require("path");
const { request } = require("express");
global.appRoot = path.resolve(__dirname);

const app = express();


app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("."));
app.use(express.json())

app.disable("x-powered-by");


const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
