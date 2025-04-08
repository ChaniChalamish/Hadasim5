const express = require("express");
const {
  createUser,
  loginUser,
  userProfile,
  logOut,
} = require("../controllers/user.controller");
const { getSuppliersProducts } = require("../controllers/product.controller");
const {
  getSupplierOrders,
  updateOrderStatus,
  createOrder,
} = require("../controllers/order.controller");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Routes created

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/products",isAuthenticated, getSuppliersProducts);
router.get("/orders", getSupplierOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.post("/orders", isAuthenticated, createOrder);
// Routes protected by JWT
router.get("/me", isAuthenticated, userProfile);
router.post("/logout", isAuthenticated, logOut);

module.exports = router;
