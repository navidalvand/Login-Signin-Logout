const responseMiddleware = function (responseData, req, res, next) {
  const {
    data = null,
    message = "Internal Server Error",
    statusCode = 500,
  } = responseData;
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

module.exports = {
  responseMiddleware,
};
