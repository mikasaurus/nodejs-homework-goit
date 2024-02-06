import Joi from "joi";

export const userSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email.required(),
});
