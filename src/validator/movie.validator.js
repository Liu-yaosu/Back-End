const joi = require("joi");
const schema = joi.object({
  judul: joi.string(),
  category: joi.string(),
});

module.exports = schema;
