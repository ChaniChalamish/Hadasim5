const orderService = require("../services/order.service");
const { validateOrder } = require("../validators/order.validator");
const createOrder = async (req, res) => {
  try {
    console.log("Creating order:", req.body);
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const grocerId = req.user.id; // Assuming you have auth middleware setting req.user
    const { supplierId, products } = req.body;
    
    const order = await orderService.createOrderService(grocerId, supplierId, products);

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("Order creation failed:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

const getSupplierOrders = async (req, res) => {
  try {
    console.log("Getting supplier orders for user:", req.user.id);
    const supplierId = req.user.id;

    if (req.user.role !== "supplier") {
      const error = new Error("not authorized as a supplier");
      error.statusCode = 403;
      return next(error);
    }

    const orders = await orderService.getOrdersBySupplierId(supplierId);

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getSupplierOrders:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
const getallOrders = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   const error = new Error("not authorized as a admin");
    //   error.statusCode = 403;
    //   return next(error);
    // }
    const grocerId = req.user.id;

    const orders = await orderService.getOrdersByGrocerId(grocerId);

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getGrocerrOrders:", error.message);
    return res.status(500).json({ message: error.message });
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
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getPendingOrders:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
const updateOrderStatus = async (req, res, next) => {
  try {
    
       
  
    const orderId = req.params.id;
  
    const updatedOrder = await orderService.updateOrderStatus(
      orderId,
      req.user.role
    );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getSupplierOrders,
  getallOrders,
  getPendingOrders,
  updateOrderStatus,
};
