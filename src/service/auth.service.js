const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../utils/init-redis");
const { UserModel } = require("../models/user.model");
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
    async findById(model, id) {
      return await model.findById(id);
    },
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

    verifyToken: async (token) => {
      try {
        const result = await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
        return result;
      } catch (err) {
        return err;
      }
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
    clearCookie: (res, cookie) => {
      res.clearCookie(cookie);
    },
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
    deleteKey: async (key) => {
      const result = await redisClient.del(key);
      console.log(result);
      return result;
    },
  };
}

module.exports = {
  AuthService: new AuthService(),
};
