const { ResponseHandler } = require("../utils/responseHandlers");
const { AuthValidator } = require("../validators/auth.validations");

class ValidatorMiddleware {
  signupDataValidator(req, res, next) {
    try {
      const {
        username,
        email,
        phone,
        firstName,
        lastName,
        age,
        password,
        confirm_password,
      } = req.body;
      if (password !== confirm_password)
        throw ResponseHandler.badRequest({
          statusCode: 400,
          message: "password and confirm_password are not the same",
        });
      const validationResult = AuthValidator.signup.validate({
        username,
        email,
        phone,
        firstName,
        lastName,
        age,
        password,
      });
      if (validationResult.error)
        throw ResponseHandler.badRequest({
          statusCode: 400,
          message: validationResult.error.message,
          data: validationResult.error,
        });
      next();
    } catch (err) {
      next(err);
    }
  }

  signinDataValidator(req, res, next) {
    try {
      const { username, password } = req.body;

      const validationResult = AuthValidator.signin.validate({
        username,
        password,
      });
      if (validationResult.error)
        throw ResponseHandler.badRequest({
          statusCode: 400,
          message: validationResult.error.message,
          data: validationResult.error,
        });
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ValidatorMiddleware: new ValidatorMiddleware(),
};
