import Joi from "joi";

export const moviePayloadSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
  year: Joi.number().integer().min(0).required(),
  duration: Joi.number().integer().min(0).required(),
  watching: Joi.boolean(),
});
