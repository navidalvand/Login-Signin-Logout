class ResponseHandler {
  ok({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "OK",
      data: data || null,
    };
  }

  badRequest({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "OK",
      data: data || null,
    };
  }
  unUthorized({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "OK",
      data: data || null,
    };
  }

  created({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "OK",
      data: data || null,
    };
  }
}

module.exports = {
  ResponseHandler: new ResponseHandler(),
};
