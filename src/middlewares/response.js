const responseMiddleware = function (responseData, req, res, next) {
  const { data, message, statusCode } = responseData;
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};



module.exports = {
  responseMiddleware,
};
