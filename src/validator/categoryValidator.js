const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(255),
});

module.exports = categorySchema;
