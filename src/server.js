const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const config = require("./Config/config.js");
require("./Config/mongo");
const clientRouter = require("./Routes/client.router");
const oauthRouter = require("./Routes/oauth.router");
const phaRouter = require("./Routes/pha.routes");
const csvToJSON = require("./Utils/csvToJSON");
const passport = require("passport");

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

app.use(passport.initialize());
app.use(passport.session());

app.disable("x-powered-by");

const protection = (req, res, next) => {
    if (!req.headers.authorization) {
        return (res.status(401).json("ok"));
    } else next();
}

app.use("/api/clients", protection, clientRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/phas", protection, phaRouter)


const start = async() => {
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