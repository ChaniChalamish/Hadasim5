const orderService = require("../services/order.service");
const createOrder = async (req, res, next) => {
  try {
    const { supplierId, grocerId, products } = req.body;
    const order = await orderService.createOrder({
      supplierId,
      grocerId,
      products,
    });
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    error.statusCode = 500;
    next(error);
  }
};
const getSupplierOrders = async (req, res, next) => {
  try {
    const supplierId = req.user.id;

    if (req.user.role !== "supplier") {
      const error = new Error("not authorized as a supplier");
      error.statusCode = 403;
      return next(error);
    }

    const orders = await orderService.getOrdersBySupplierId(supplierId);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getSupplierOrders:", error.message);
    error.statusCode = 500;
    next(error);
  }
};
const getallOrders = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error("not authorized as a admin");
      error.statusCode = 403;
      return next(error);
    }
    const grocerId = req.user.id;

    const orders = await orderService.getOrdersByGrocerId(grocerId);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getGrocerrOrders:", error.message);
    error.statusCode = 500;
    next(error);
  }
};
const getPendingOrders = async (req, res, next) => {
  try {
    // if (req.user.role!== "admin") {
    //   const error = new Error("not authorized as a admin");
    //   error.statusCode = 403;
    //   return next(error);
    // }
    // const grocerId = req.user.id;
    const orders = await orderService.getPendingOrders();
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getPendingOrders:", error.message);
    error.statusCode = 500;
    next(error);
  }
};
const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const updatedOrder = await orderService.updateOrderStatus(
      orderId,
      newStatus
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error.message);
    error.statusCode = 500;
    next(error);
  }
};

module.exports = {
  createOrder,
  getSupplierOrders,
  getallOrders,
  getPendingOrders,
  updateOrderStatus,

};
