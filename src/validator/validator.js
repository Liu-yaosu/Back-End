const joi = require("joi");
const schema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().required(),
  password: joi.string(),
});

module.exports = schema;
