const mongoose = require("mongoose");
const { v4 } = require("uuid");

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    _id: { type: String, default: v4 },

    supplierId: {
      type: String,
      ref: "User", // supplier id
      required: true,
    },
    grocerId: {
      type: String,
      ref: "User", // grocer id
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        pricePerItem: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },

    ],

    status: {
      type: String,
      enum: [ "pending", "in progress","Done"],
      default: "pending",
    },
    totalOrderPrice:{
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
