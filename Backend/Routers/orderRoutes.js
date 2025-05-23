import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../Controllers/orderController.js";

const router = express.Router();

// Define routes
router.post("/", createOrder); // Create a new order
router.get("/", getAllOrders); // Get all orders
router.get("/:id", getOrderById); // Get a single order by ID
router.put("/:id", updateOrder); // Update an order
router.delete("/:id", deleteOrder); // Delete an order

export default router;