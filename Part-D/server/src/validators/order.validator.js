const Joi = require("joi");

const orderItemSchema = Joi.object({
  _id: Joi.string().required().messages({
    "any.required": "מזהה מוצר נדרש",
  }),
  name: Joi.string().min(1).required().messages({
    "string.empty": "שם המוצר נדרש",
    "any.required": "יש לספק שם מוצר",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "הכמות חייבת להיות מספר",
    "number.min": "הכמות חייבת להיות לפחות 1",
    "any.required": "יש לציין כמות",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "המחיר ליחידה חייב להיות מספר",
    "number.min": "המחיר חייב להיות חיובי",
    "any.required": "יש לציין מחיר ליחידה",
  }),
  
});

const orderSchema = Joi.object({
  supplierId: Joi.string().required().messages({
    "any.required":"must have a supplierId",
  }),
  products: Joi.array().items(orderItemSchema).min(1).required().messages({
    "array.base": "products must be an array",
    "array.min": "must have at least one product",
    "any.required": "",
  }),
});

exports.validateOrder = (data) => {
    const { err, value } = orderSchema.validateAsync(data);
    return { err: err, value };
  };

