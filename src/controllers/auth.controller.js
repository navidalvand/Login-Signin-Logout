const { ResponseHandler } = require("../utils/responseHandlers");
const { AuthService } = require("../service/auth.service");
const { Models } = require("../utils/get-models");
const aDayInSeconds = 86400;
const aDayInMiliSeconds = aDayInSeconds * 1000;

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

      const hashedPassword = AuthService.hash.createHash(password);

      const createUser = await AuthService.mongo.createOne(Models.Users, {
        username,
        email,
        firstName,
        lastName,
        phone,
        age,
        password: hashedPassword,
      });
      const token = AuthService.jwt.signToken({ userId: createUser._id });

      if (!createUser)
        throw ResponseHandler.internalServerError({
          message: "user did not save",
          data: createUser,
        });

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
      const token = AuthService.cookies.getCookie(req, "token");
      if (token)
        throw ResponseHandler.badRequest({
          message: "you'are already loged in",
        });
      const { username, password } = req.body;
      const user = await AuthService.mongo.findOne(Models.Users, { username });
      if (!user)
        throw ResponseHandler.badRequest({
          message: "username or password is wrong",
        });

      const comparePassword = AuthService.hash.compareHash(
        password,
        user.password
      );

      if (!comparePassword)
        throw ResponseHandler.badRequest({
          message: "username or password is wrong",
        });

      const createToken = AuthService.jwt.signToken({ userId: user._id });

      AuthService.cookies.setCookie(res, {
        cookieName: "token",
        value: createToken,
        expiresIn: aDayInMiliSeconds,
      });

      const cashedToken = await AuthService.redis.setKey({
        key: `token:${user._id}`,
        value: createToken,
        expiresIn: aDayInSeconds,
      });

      if (!cashedToken)
        throw ResponseHandler.internalServerError({
          message: "cannot save the token in redis",
          data: cashedToken,
        });

      next(ResponseHandler.ok({ message: "you logged in", data: user }));
    } catch (err) {
      next(err);
    }
  }
  async signout(req, res, next) {
    try {
      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
