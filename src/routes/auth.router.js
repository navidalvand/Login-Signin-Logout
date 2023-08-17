const { AuthController } = require("../controllers/auth.controller");

const router = require("express").Router();

router.use("/signin", AuthController.signin);

module.exports = {
  mainRoutes: router,
};
