import express from 'express';
import { getTables, createTable, updateTable, deleteTable } from '../Controllers/tableController.js ';

const router = express.Router();

router.get('/', getTables);
router.post('/', createTable);
router.put('/:id', updateTable); // Add this route for updating a table
router.delete('/:id', deleteTable); // Add this route for deleting a table

export default router;