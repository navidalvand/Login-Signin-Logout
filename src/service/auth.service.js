const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../utils/init-redis");
require("dotenv").config();

class AuthService {
  mongo = {
    async createOne(model, options) {
      return await model.create(options);
    },
    async findOne(model, condition = {}, selection = {}) {
      return await model.findOne(condition, selection);
    },
    async checkField(model, condition) {
      return !!(await model.findOne(condition));
    },
    async findMany() {},
  };

  hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, {
      expiresIn: "24h",
    });
  }

  cookies = {
    setCookie: (res, { cookieName, value, expiresIn }) => {
      res.cookie(cookieName, value, {
        maxAge: expiresIn,
        httpOnly: true,
      });
    },
    getCookie: (key) => {},
    clearCookie: (key) => {},
  };

  redis = {
    setKey: async ({ key, value, expiresIn }) => {
      const setCash = await redisClient.setEx(key, expiresIn, value);
      return setCash;
    },
    getKey: async (key) => {
      const getCash = await redisClient.get(key);
      return getCash;
    },
  };
}

module.exports = {
  AuthService: new AuthService(),
};
