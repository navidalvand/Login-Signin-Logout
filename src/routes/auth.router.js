const { AuthController } = require("../controllers/auth.controller");
const { ValidatorMiddleware } = require("../middlewares/validation.middleware");

const router = require("express").Router();

router.post(
  "/signin",
  ValidatorMiddleware.signinDataValidator,
  AuthController.signin
);

module.exports = {
  mainRoutes: router,
};
