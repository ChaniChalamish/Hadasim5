const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.empty": "שם המוצר נדרש",
    "string.min": "שם המוצר קצר מדי",
    "any.required": "יש לספק שם מוצר",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "המחיר חייב להיות מספר",
    "number.min": "המחיר חייב להיות 0 או יותר",
    "any.required": "יש לספק מחיר",
  }),

  minQuantity: Joi.number().min(1).required().messages({
    "number.base": "הכמות המינימלית חייבת להיות מספר",
    "number.min": "הכמות המינימלית חייבת להיות לפחות 1",
    "any.required": "יש לספק כמות מינימלית להזמנה",
  }),

});
const productArraySchema = Joi.array().items(productSchema).min(1);

module.exports = {
  validateProduct: (data) => productSchema.validateAsync(data),
  productSchema,
  productArraySchema,
};

