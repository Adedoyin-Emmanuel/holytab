import Joi from "joi";

export const confessionSchema = Joi.object({
  skip: Joi.number().integer().min(0).default(0),
  take: Joi.number().integer().min(1).max(20).default(10),
  search: Joi.string().allow("").default(""),
  mode: Joi.string().valid("random", "sequential").default("random"),
});
