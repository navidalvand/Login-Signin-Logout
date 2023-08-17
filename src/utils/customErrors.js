class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
    this.message = message;
    this.statusCode = 400;
  }
}
class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorized";
    this.message = message;
    this.statusCode = 401;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = {
  BadRequestError,
  UnAuthorizedError,
  NotFoundError,
};
