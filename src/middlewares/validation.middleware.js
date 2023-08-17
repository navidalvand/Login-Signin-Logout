class ValidatorMiddleware {
  signinDataValidator(req, res, next) {
    try {
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ValidatorMiddleware: new ValidatorMiddleware(),
};
