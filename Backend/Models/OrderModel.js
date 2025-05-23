import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the item
  quantity: { type: Number, required: true }, // Quantity of the item
  price: { type: Number, required: true }, // Price per unit
  total: { type: Number, required: true }, // Total price (quantity * price)
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true }, // Unique order number
  customerName: { type: String, required: true }, // Name of the customer
  items: [OrderItemSchema], // Array of items in the order
  totalAmount: { type: Number, required: true }, // Total amount of the order
  status: { type: String, default: "Pending" }, // Order status (e.g., Pending, Completed)
  createdAt: { type: Date, default: Date.now }, // Timestamp of order creation
});

export default mongoose.model("Order", OrderSchema);