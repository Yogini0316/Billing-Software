import Table from '../Models/Table.js';

// Get all tables
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new table
export const createTable = async (req, res) => {
  const table = req.body;
  const newTable = new Table(table);
  try {
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a table
export const updateTable = async (req, res) => {
  const { id } = req.params;
  const updatedTable = req.body;
  try {
    const table = await Table.findByIdAndUpdate(id, updatedTable, { new: true });
    res.status(200).json(table);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a table
export const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    await Table.findByIdAndDelete(id); // Changed from findByIdAndRemove to findByIdAndDelete
    res.status(200).json({ message: "Table deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};