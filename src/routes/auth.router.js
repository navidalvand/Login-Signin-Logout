const { AuthController } = require("../controllers/auth.controller");
const { ValidatorMiddleware } = require("../middlewares/validation.middleware");

const router = require("express").Router();

router.post(
  "/sign-up",
  ValidatorMiddleware.signupDataValidator,
  AuthController.signup
);

router.post(
  "/sign-in",
  ValidatorMiddleware.signinDataValidator,
  AuthController.signin
);

router.get(
  "/sign-out",
  AuthController.signout
);

module.exports = {
  mainRoutes: router,
};
