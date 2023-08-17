class ResponseHandler {
  send({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "OK",
      data: data || null,
    };
  }
}

module.exports = {
  ResponseHandler : new ResponseHandler(),
};
