const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

const {
  newOrder,
  getSingleOrder,
  myAllOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderControllers");

// create order
router.post("/order/new", isAuthenticatedUser, newOrder);

// get single order
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);

// get all order (Login user only)
router.get("/orders/me", isAuthenticatedUser, myAllOrders);

// get all orders (Admin)
router.get("/admin/orders", isAuthenticatedUser, isAdmin, getAllOrders);

// update order --(Admin)
router.put("/admin/order/:id", isAuthenticatedUser, isAdmin, updateOrder);

// delete order --(Admin)
router.delete("/admin/order/:id", isAuthenticatedUser, isAdmin, deleteOrder);

module.exports = router;
