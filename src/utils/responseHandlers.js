class ResponseHandler {
  ok({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 200,
      message: message || "Ok",
      data: data || null,
    };
  }

  badRequest({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 400,
      message: message || "BadRequest",
      data: data || null,
    };
  }
  unUthorized({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 401,
      message: message || "UnAuthorized",
      data: data || null,
    };
  }

  created({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 201,
      message: message || "Created",
      data: data || null,
    };
  }

  internalServerError({ statusCode, message, data }) {
    return {
      statusCode: statusCode || 500,
      message: message || "Internal Server Error",
      data: data || null,
    };
  }
}

module.exports = {
  ResponseHandler: new ResponseHandler(),
};
