const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const config = require("./Config/config.js");
require("./Config/mongo");
const clientRouter = require("./Routes/client.router");
const phaRouter = require("./Routes/pha.routes");
const csvToJSON = require("./Utils/csvToJSON");

const path = require("path");
const { request } = require("express");
global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("."));
app.use(express.json());

app.disable("x-powered-by");

app.use("/api/clients", clientRouter);
app.use("/api/phas", phaRouter);

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
