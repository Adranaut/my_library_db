import Joi from "joi";

export const bookPayloadSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
  year: Joi.number().integer().min(0).required(),
  author: Joi.string().required(),
  summary: Joi.string().allow("", null),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().min(0),
  readPage: Joi.number().integer().min(0),
  reading: Joi.boolean(),
});

export const bookUpdatePayloadSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
  year: Joi.number().integer().min(0).required(),
  author: Joi.string().required(),
  summary: Joi.string().allow("", null),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().min(0),
  readPage: Joi.number().integer().min(0),
  reading: Joi.boolean(),
});

export const bookQuerySchema = Joi.object({
  title: Joi.string().allow("").optional(),
  reading: Joi.boolean().truthy("1").falsy("0").optional(),
});
