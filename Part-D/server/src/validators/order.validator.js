const Joi = require("joi");

const orderItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "מזהה מוצר נדרש",
  }),
  productName: Joi.string().min(1).required().messages({
    "string.empty": "שם המוצר נדרש",
    "any.required": "יש לספק שם מוצר",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "הכמות חייבת להיות מספר",
    "number.min": "הכמות חייבת להיות לפחות 1",
    "any.required": "יש לציין כמות",
  }),
  pricePerItem: Joi.number().min(0).required().messages({
    "number.base": "המחיר ליחידה חייב להיות מספר",
    "number.min": "המחיר חייב להיות חיובי",
    "any.required": "יש לציין מחיר ליחידה",
  }),
  totalPrice: Joi.number().min(0).required().messages({
    "number.base": "המחיר הכולל חייב להיות מספר",
    "number.min": "המחיר הכולל חייב להיות חיובי",
    "any.required": "יש לציין מחיר כולל",
  }),
});

const orderSchema = Joi.object({
  supplierId: Joi.string().required().messages({
    "any.required": "יש לצרף מזהה ספק",
  }),
  items: Joi.array().items(orderItemSchema).min(1).required().messages({
    "array.base": "שדה הפריטים חייב להיות מערך",
    "array.min": "יש לכלול לפחות פריט אחד בהזמנה",
    "any.required": "שדה הפריטים נדרש",
  }),
  status: Joi.string()
    .valid("ממתינה", "בתהליך", "הושלמה")
    .default("ממתינה")
    .messages({
      "any.only": "הסטטוס חייב להיות אחד מהבאים: ממתינה, בתהליך, הושלמה",
    }),
});

exports.validateOrder = (data) => {
    const { err, value } = productSchema.validateAsync(data);
    return { err: err, value };
  };

