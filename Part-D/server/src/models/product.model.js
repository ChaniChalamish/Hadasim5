const mongoose = require("mongoose");
const { v4 } = require("uuid");

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    _id: { type: String, default: v4 },

    supplierId: {
      type: String,
      ref: "User", // מקשר לספק
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },

    minQuantity: {
      type: Number,
      required: true,
      min: [1, "Minimum quantity must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
