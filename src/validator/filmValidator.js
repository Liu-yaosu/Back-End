const joi = require("joi");
const schema = joi.object({
  movie_name: joi.string(),
  category: joi.string(),
});

module.exports = schema;
