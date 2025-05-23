import mongoose from 'mongoose';

// Define the schema for items
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the schema for bills
const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Define the schema for tables
const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subTable: { type: String, default: "" },
  items: [ItemSchema], // Array of items
  paymentMethod: { type: String, default: "cash" },
  bills: [BillSchema], // Array of bills
});

// Create and export the Table model
export default mongoose.model('Table', TableSchema);