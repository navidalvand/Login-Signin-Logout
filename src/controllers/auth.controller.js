const { ResponseHandler } = require("../utils/responseHandlers");
const { AuthService } = require("../service/auth.service");
const { Models } = require("../utils/get-models");

class AuthController {
  async signup(req, res, next) {
    try {
      const { username, email, phone, firstName, lastName, age, password } =
        req.body;

      const uniqueFields = [{ username }, { email }, { phone }];

      if (!phone) uniqueFields.pop();

      const result = [];
      await Promise.all(
        uniqueFields.map(async (field) => {
          const check = await AuthService.mongo.checkField(Models.Users, field);
          if (check) result.push(field);
        })
      );

      if (result.length > 0)
        throw ResponseHandler.badRequest({
          statusCode: 400,
          message: "duplicate error",
          data: result,
        });

      const hashedPassword = AuthService.hashPassword(password);

      const createUser = await AuthService.mongo.createOne(Models.Users, {
        username,
        email,
        firstName,
        lastName,
        phone,
        age,
        password: hashedPassword,
      });
      const token = AuthService.signToken({ userId: createUser._id });

      if (!createUser)
        throw ResponseHandler.internalServerError({
          message: "user did not save",
          data: createUser,
        });
      const aDayInSeconds = 86400;
      const aDayInMiliSeconds = aDayInSeconds * 1000;

      AuthService.cookies.setCookie(res, {
        cookieName: "token",
        value: token,
        expiresIn: aDayInMiliSeconds,
      });

      const cashedToken = await AuthService.redis.setKey({
        key: `token:${createUser._id}`,
        value: token,
        expiresIn: aDayInSeconds,
      });

      if (!cashedToken)
        throw ResponseHandler.internalServerError({
          message: "cannot save the token in redis",
          data: cashedToken,
        });

      next(
        ResponseHandler.created({
          message: "user created successfully",
          data: createUser,
        })
      );
    } catch (err) {
      next(err);
    }
  }
  async signin(req, res, next) {
    try {
      next(ResponseHandler.send({ message: "test fucking message" }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
