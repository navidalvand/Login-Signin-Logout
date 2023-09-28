const Joi = require("joi");
const iranPhoneNumberPattern = /^09(0[1-2]|3[0-9]|9[0-2])\d{7}$/;

class AuthValidator {
  signup = Joi.object({
    username: Joi.string().trim().min(4).max(24).required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().trim().regex(iranPhoneNumberPattern),
    firstName: Joi.string().trim().min(2).max(24),
    lastName: Joi.string().trim().min(2).max(24),
    age: Joi.number().integer().min(1).max(101),
    password: Joi.string().trim().min(8).max(24).required(),
  });
}

module.exports = {
  AuthValidator: new AuthValidator(),
};
