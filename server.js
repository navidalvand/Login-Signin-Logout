const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { mainRoutes } = require("./src/routes/auth.router");
const { responseMiddleware } = require("./src/middlewares/response.middleware");
const cookieParser = require("cookie-parser");


class Server {
  constructor() {
    this.configServer();
    this.connectToDataBase();
    this.initRedis();
    this.createRoutes();
    this.errorHandler();
    this.startServer();
  }

  configServer() {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cookieParser());
  }

  connectToDataBase() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("connected to database");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createRoutes() {
    app.use(mainRoutes);
  }

  errorHandler() {
    app.use(responseMiddleware);

    app.use((req, res, next) => {
      res.status(404).json({
        statusCode: 404,
        message: "not found",
        data: null,
      });
    });
  }

  initRedis() {
    require('./src/utils/init-redis');
  }

  startServer() {
    app.listen(process.env.SERVER_PORT, (err) => {
      if (err) return console.log(err);
      console.log(`server started on port ${process.env.SERVER_PORT}`);
    });
  }
}

new Server();
