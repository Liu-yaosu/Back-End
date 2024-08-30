const joi = require("joi");
const schema = joi.object({
  movie_title: joi.string(),
  description: joi.string(),
  category: joi.string(),
  movie_url: joi.string(),
  categoryId: joi.array().items(joi.number().integer().min(1).required()),
});

module.exports = schema;
