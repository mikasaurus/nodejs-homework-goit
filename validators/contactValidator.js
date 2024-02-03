import Joi from "joi";

export const schemaPost = Joi.object({
  username: Joi.string().required,
  email: Joi.string().email().required,
  phone: Joi.string().required,
});

export const schemaPut = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
