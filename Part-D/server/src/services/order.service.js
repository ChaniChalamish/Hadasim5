const Order = require("../models/order.model");

const createOrder = async (order) => {
  try {
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (error) {
    throw new Error(`Error creating new order: ${error.message}`);
  }
};

// Get orders by supplierId

const getOrdersBySupplierId = async (supplierId) => {
  try {
    const orders = await Order.find({ supplierId }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting orders by supplierId:${error.message}`);
  }
};
const getAllOrders = async (grocerId) => {
  try {
    const orders = await Order.find({ grocerId }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting orders by grocerId:${error.message}`);
  }
};
const getPendingOrders = async () => {
  try {
    // Get all pending and in progress orders.
    const orders = await Order.find({
      status: { $in: ["pending", "in progress"] },
    }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`err when getting pending orders :${error.message}`);
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
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
  createOrder,
  getOrdersBySupplierId,
  getAllOrders,
  updateOrderStatus,
  getPendingOrders,
};
