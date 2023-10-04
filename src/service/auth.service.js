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

  hash = {
    createHash: (string) => {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(string, salt);
      return hash;
    },
    compareHash: (string, hash) => {
      return bcrypt.compareSync(string, hash);
    },
  };

  jwt = {
    signToken: (payload) => {
      return jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, {
        expiresIn: "24h",
      });
    },
  };

  cookies = {
    setCookie: (res, { cookieName, value, expiresIn }) => {
      res.cookie(cookieName, value, {
        maxAge: expiresIn,
        httpOnly: true,
      });
    },
    getCookie: (req, cookieName) => {
      return req?.cookies[cookieName];
    },
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
