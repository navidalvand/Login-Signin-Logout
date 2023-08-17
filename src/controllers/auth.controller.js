const { ResponseHandler } = require("../utils/responseHandlers");

class AuthController {
  login(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  signin(req, res, next) {
    try {
      next(ResponseHandler.send({ message: "test fucking message" , }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
