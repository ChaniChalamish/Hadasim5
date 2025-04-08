const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const createOrderService = async (grocerId, supplierId, products) => {
  let totalOrderPrice = 0;
  const populatedProducts = [];

  for (const item of products) {
    const pricePerItem = item.price;
    const quantity = item.quantity;
    const totalPrice = quantity * pricePerItem;

    populatedProducts.push({
      productId: item._id,
      productName: item.name,
      quantity,
      pricePerItem,
      totalPrice,
    });

    totalOrderPrice += totalPrice;
  }

  const order = await Order.create({
    grocerId,
    supplierId,
    products: populatedProducts,
    totalOrderPrice,
  });

  return order;
};

// Get orders by supplierId

const getOrdersBySupplierId = async (supplierId) => {
  try {
    const orders = await Order.find({ supplierId })
      .populate({
        path: "products.productId", // this will populate each product in the order items
        model: "Product", // name of the model
      })
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting orders by supplierId:${error.message}`);
  }
};
const getAllOrders = async (grocerId) => {
  try {
    const orders = await Order.find({ grocerId })
      .populate({
        path: "products.productId", // this will populate each product in the order items
        model: "Product", // name of the model
      })
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting orders by grocerId:${error.message}`);
  }
};
const getPendingOrders = async () => {
  try {
    // Get all pending and in progress orders.
    const orders = await Order.find({
      $or: [{ status: "pending" }, { status: "in progress" }],
    })
      .populate({
        path: "products.productId", // this will populate each product in the order items
        model: "Product", // name of the model
      })
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting pending orders :${error.message}`);
  }
};
const getPendingOrdersById = async (supplierId) => {
  try {
    // Get all pending and in progress orders.
    const orders = await Order.find({
      $and: [
        { supplierId }, // get orders where supplierId is the current user and the order date is in the future.{
        { $or: [{ status: "pending" }, { status: "in progress" }] },
      ],
    })
      .populate({
        path: "products.productId", // this will populate each product in the order items
        model: "Product", // name of the model
      })
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting pending orders :${error.message}`);
  }
};
const updateOrderStatus = async (orderId, role) => {
  try {
    let status; // Set the status based on the role of the user who is updating the order.
    if (role === "supplier") {
      status = "in progress";
    } else status = "Done";
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    return order;
  } catch (error) {
    throw new Error(`err when updating orders :${error.message}`);
  }
};

module.exports = {
  createOrderService,
  getOrdersBySupplierId,
  getAllOrders,
  updateOrderStatus,
  getPendingOrders,
};
