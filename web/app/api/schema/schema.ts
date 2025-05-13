import Joi from "joi";

export const confessionSchema = Joi.object({
  search: Joi.string().allow("").default(""),
  skip: Joi.number().integer().min(0).default(0),
  take: Joi.number().integer().min(1).max(20).default(10),
  mode: Joi.string().valid("random", "sequential").default("random"),
});
