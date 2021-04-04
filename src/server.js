const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const config = require("./config/config.js");
require("./config/mongo");
const asteroidRouter = require("./resources/Asteroid/asteroid.router");
const userRouter = require("./resources/User/user.router");
const authRouter = require("./resources/auth/auth.router");
const addCSVtoDB = require("./Utils/addCSVtoDB");

const path = require("path");
const { request } = require("express");
global.appRoot = path.resolve(__dirname);

const app = express();

const jwtProtection = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("."));
app.use(express.json())

app.disable("x-powered-by");

app.use("/api/auth", authRouter);
app.use("/api/asteroids", jwtProtection, asteroidRouter);
app.use("/api/users", jwtProtection, userRouter);

const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
      addCSVtoDB();
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
