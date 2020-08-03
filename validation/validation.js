const Joi = require('@hapi/joi');

const validateSignUp = data => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required()
  });

  return schema.validate(data);
};

const validateSignIn = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required()
  });

  return schema.validate(data);
};

module.exports.validateSignUp = validateSignUp;
module.exports.validateSignIn = validateSignIn;
