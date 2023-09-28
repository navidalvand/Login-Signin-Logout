const chalk = require("chalk");
const { ResponseHandler } = require("../utils/responseHandlers");

class AuthController {
  signup(req, res, next) {
    try {
      console.log(chalk.bgWhite.black("here is the sign-up controller"));
    } catch (err) {
      next(err);
    }
  }
  signin(req, res, next) {
    try {
      next(ResponseHandler.send({ message: "test fucking message" }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
