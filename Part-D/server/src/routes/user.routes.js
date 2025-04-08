const express = require("express");
const {
  createUser,
  loginUser,

  getSuppliers,
  userProfile,
  logOut,
} = require("../controllers/user.controller");
const { getSuppliersProducts } = require("../controllers/product.controller");
const {
  getallOrders,
  updateOrderStatus,
  createOrder,
} = require("../controllers/order.controller");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Routes created

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/products/:id",isAuthenticated, getSuppliersProducts);
router.get("/suppliers", isAuthenticated, getSuppliers);
router.get("/orders", isAuthenticated,getallOrders);
router.put("/orders/:id", isAuthenticated,updateOrderStatus);
router.post("/orders", isAuthenticated, createOrder);
// Routes protected by JWT
router.get("/me", isAuthenticated, userProfile);
router.post("/logout", isAuthenticated, logOut);

module.exports = router;
