import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingTables = () => {
  const API_URL = "/api/v1/tables"; // Update this to match your backend route
  const [tables, setTables] = useState([]);
  const tableOptions = Array.from({ length: 10 }, (_, i) => `Table ${i + 1}`);
  const subTableOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [suggestions, setSuggestions] = useState({});
  const [currentTableId, setCurrentTableId] = useState(null);

  const menuItems = [
    { name: "Pepsi", price: 30 },
    { name: "Pizza", price: 150 },
    { name: "Pav Bhaji", price: 90 },
    { name: "Pulao", price: 100 },
    { name: "Pasta", price: 120 },
    { name: "Aloo Gobi", price: 100 },
    { name: "Chole Bhature", price: 100 },
    { name: "Dal Tadka", price: 120 },
    { name: "French Fries", price: 70 },
    { name: "Grilled Sandwich", price: 70 },
    { name: "Idli Sambar", price: 60 },
    { name: "Masala Dosa", price: 80 },
    { name: "Medu Vada", price: 50 },
    { name: "Mix Veg", price: 130 },
    { name: "Palak Paneer", price: 150 },
    { name: "Paneer Bhurji", price: 140 },
    { name: "Paneer Butter Masala", price: 180 },
    { name: "Paneer Do Pyaza", price: 160 },
    { name: "Paneer Lababdar", price: 170 },
    { name: "Paneer Tikka", price: 160 },
    { name: "Paneer Tikka Masala", price: 180 },
    { name: "Pav Bhaji", price: 90 },
    { name: "Rajma Chawal", price: 110 },
    { name: "Stuffed Capsicum", price: 120 },
    { name: "Tomato Soup", price: 70 },
    { name: "Veg Biryani", price: 150 },
    { name: "Veg Burger", price: 80 },
    { name: "Veg Cutlet", price: 60 },
    { name: "Veg Sandwich", price: 50 },
  
    // Paratha Section
    { name: "Aloo Paratha", price: 60 },
    { name: "Cheese Paratha", price: 80 },
    { name: "Gobi Paratha", price: 70 },
    { name: "Methi Paratha", price: 65 },
    { name: "Mix Veg Paratha", price: 75 },
    { name: "Onion Paratha", price: 60 },
    { name: "Paneer Paratha", price: 80 },
    { name: "Plain Paratha", price: 40 },
    { name: "Stuffed Paratha", price: 70 },
  
    // Roti / Bread
    { name: "Butter Naan", price: 25 },
    { name: "Garlic Naan", price: 30 },
    { name: "Plain Roti", price: 10 },
    { name: "Tandoori Roti", price: 15 },
  
    // Non-Veg Items
    { name: "Chicken Biryani", price: 220 },
    { name: "Chicken Burger", price: 100 },
    { name: "Chicken Curry", price: 200 },
    { name: "Chicken Kebab", price: 200 },
    { name: "Chicken Lollipop", price: 190 },
    { name: "Chicken Pizza", price: 160 },
    { name: "Chicken Tikka Masala", price: 210 },
    { name: "Egg Curry", price: 160 },
    { name: "Fish Fry", price: 210 },
    { name: "Hyderabadi Biryani", price: 240 },
    { name: "Mutton Rogan Josh", price: 270 },
    { name: "Tandoori Chicken", price: 250 },
  
    // Chinese Items
    { name: "Chicken Manchurian", price: 180 },
    { name: "Hakka Noodles", price: 110 },
    { name: "Manchow Soup", price: 90 },
    { name: "Schezwan Fried Rice", price: 130 },
    { name: "Spring Roll", price: 100 },
    { name: "Sweet Corn Soup", price: 80 },
    { name: "Veg Noodles", price: 120 },
  
    // Rice / Indian Main Course
    { name: "Boiled Rice", price: 60 },
    { name: "Jeera Rice", price: 70 },
  
    // Sweets
    { name: "Gulab Jamun", price: 50 },
    { name: "Ice Cream (Single Scoop)", price: 40 },
    { name: "Rasgulla", price: 50 },
  
    // Drinks
    { name: "Butter Milk", price: 30 },
    { name: "Chocolate Milkshake", price: 80 },
    { name: "Cold Drink", price: 30 },
    { name: "Fresh Lime Soda", price: 40 },
    { name: "Green Tea", price: 30 },
    { name: "Hot Coffee", price: 35 },
    { name: "Mango Lassi", price: 60 },
    { name: "Masala Tea", price: 25 },
    { name: "Strawberry Milkshake", price: 75 },
    { name: "Sweet Lassi", price: 50 },
    { name: "Vanilla Milkshake", price: 75 }
  ];

  // Fetch tables from the backend
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get(API_URL);
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  // Add a new table
  const addTable = async () => {
    const newTable = {
      name: `Table ${tables.length + 1}`,
      subTable: "",
      items: [],
      paymentMethod: "cash",
    };
    try {
      const response = await axios.post(API_URL, newTable);
      setTables([...tables, response.data]);
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  // Update table name
  const updateTableName = async (id, newName) => {
    try {
      const updatedTable = { name: newName };
      const response = await axios.put(`${API_URL}/${id}`, updatedTable);
      setTables(tables.map((table) => (table._id === id ? response.data : table)));
    } catch (error) {
      console.error("Error updating table name:", error);
    }
  };

  // Update sub-table
  const updateSubTable = async (id, newSubTable) => {
    try {
      const updatedTable = { subTable: newSubTable };
      const response = await axios.put(`${API_URL}/${id}`, updatedTable);
      setTables(tables.map((table) => (table._id === id ? response.data : table)));
    } catch (error) {
      console.error("Error updating sub-table:", error);
    }
  };

  // Add item to table
  const addItemToTable = async (id, item) => {
    try {
      const table = tables.find((table) => table._id === id);
      const updatedTable = { ...table, items: [...table.items, item] };
      const response = await axios.put(`${API_URL}/${id}`, updatedTable);
      setTables(tables.map((table) => (table._id === id ? response.data : table)));
    } catch (error) {
      console.error("Error adding item to table:", error);
    }
  };

  // Clear table data (items and subTable)
  const clearTableData = async (id) => {
    try {
      const updatedTable = {
        items: [], // Clear items
        subTable: "", // Clear subTable
      };
      const response = await axios.put(`${API_URL}/${id}`, updatedTable);
      setTables(tables.map((table) => (table._id === id ? response.data : table)));
    } catch (error) {
      console.error("Error clearing table data:", error);
    }
  };

  // Delete a table
    // Delete a table with better error handling
    const deleteTable = async (id) => {
      if (window.confirm("Are you sure you want to delete this table?")) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setTables(tables.filter((table) => table._id !== id));
          toast.success("Table deleted successfully");
        } catch (error) {
          toast.error("Error deleting table: " + (error.response?.data?.message || error.message));
          console.error("Error deleting table:", error);
        }
      }
    };

  // Print invoice with logo, organization details, and responsive design
  const printInvoice = (table) => {
    const invoiceWindow = window.open("", "Invoice", "width=600,height=400");
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .invoice-header img {
              max-width: 150px;
              height: auto;
            }
            .invoice-header h1 {
              margin: 10px 0;
              font-size: 24px;
            }
            .invoice-header p {
              margin: 5px 0;
              font-size: 14px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid #000;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            .total-row {
              font-weight: bold;
            }
            @media print {
              body {
                width: 100%;
                margin: 0;
                padding: 0;
              }
              .invoice-header {
                text-align: center;
              }
              table {
                width: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <img src="https://via.placeholder.com/150" alt="Company Logo" />
            <h1>HOTEL GRAND PLAZA</h1>
            <p>123 Main Street, City, State, ZIP</p>
            <p>Phone: +123 456 7890 | Email: info@myorg.com</p>
            <p>GST NO: 29ABCDE1234F1Z5</p>
          </div>
          <h2>Invoice for ${table.name} ${table.subTable ? `- ${table.subTable}` : ""}</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${table.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                <td><strong>${table.items
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
    invoiceWindow.close();
  };

  //new
  const handleItemNameChange = (tableId, value) => {
    const matched = menuItems.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions((prev) => ({ ...prev, [tableId]: matched }));
  };

  // Handle key down for adding items
  const handleKeyDown = (event, table) => {
    if (event.key === "Enter") {
      const nameEl = document.getElementById(`itemName-${table._id}`);
      const priceEl = document.getElementById(`itemPrice-${table._id}`);
      const quantityEl = document.getElementById(`itemQuantity-${table._id}`);
  
      const name = nameEl.value.trim();
      const price = parseFloat(priceEl.value);
      const quantity = parseInt(quantityEl.value);
  
      if (name && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
        const newItem = { name, price, quantity };
        addItemToTable(table._id, newItem);
  
        nameEl.value = "";
        priceEl.value = "";
        quantityEl.value = "";
      } else {
        alert("Please enter valid item details.");
      }
    }
  };  

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Billing Tables</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={addTable}
        >
          Add Table
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {tables.map((table) => {
          // Calculate the total price of all items in the table
          const totalPrice = table.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          return (
            <div
              key={table._id}
              className="p-6 bg-white rounded shadow-lg border border-gray-200 hover:shadow-2xl transition-all w-fit"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {table.name} {table.subTable && `- ${table.subTable}`}
                </h3>
                <button
                  onClick={() => deleteTable(table._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Table"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-600 mt-2">
                  Select Table:
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded text-sm"
                  value={table.name}
                  onChange={(e) => updateTableName(table._id, e.target.value)}
                >
                  {tableOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {/* <label className="block text-sm font-medium text-gray-600 mt-2">
                  Sub Table:
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded text-sm"
                  value={table.subTable}
                  onChange={(e) => updateSubTable(table._id, e.target.value)}
                >
                  <option value="">Select Sub Table</option>
                  {subTableOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select> */}
              </div>
              <div className="flex gap-2 mb-4 ">
              <div className="relative w-full">
  <input
    type="text"
    className="flex-1 p-2 border rounded text-sm w-full"
    id={`itemName-${table._id}`}
    placeholder="Item Name"
    onKeyDown={(event) => handleKeyDown(event, table)}
    onChange={(e) => handleItemNameChange(table._id, e.target.value)}
  />
  {suggestions[table._id] && suggestions[table._id].length > 0 && (
    <ul className="absolute z-10 bg-white border rounded shadow max-h-40 overflow-y-auto w-full">
      {suggestions[table._id].map((item, index) => (
        <li
          key={index}
          className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
          onClick={() => {
            document.getElementById(`itemName-${table._id}`).value = item.name;
            document.getElementById(`itemPrice-${table._id}`).value = item.price;
            setSuggestions((prev) => ({ ...prev, [table._id]: [] }));
          }}
        >
          {item.name} - ₹{item.price}
        </li>
      ))}
    </ul>
  )}
</div>

                <input
                  type="number"
                  className="w-20 p-2 border rounded text-sm"
                  id={`itemPrice-${table._id}`}
                  placeholder="Price"
                  onKeyDown={(event) => handleKeyDown(event, table)}
                />
                <input
                  type="number"
                  className="w-20 p-2 border rounded text-sm"
                  id={`itemQuantity-${table._id}`}
                  placeholder="Qty"
                  onKeyDown={(event) => handleKeyDown(event, table)}
                />
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold">Added Items:</h4>
                {table.items.length === 0 ? (
                  <p className="text-xs text-gray-500">No items added yet.</p>
                ) : (
                  <ul className="text-sm">
                    {table.items.map((item, index) => (
                      <div key={index}>
                        <li className="flex justify-between">
                          <span>
                            {item.name} = {item.quantity} * {item.price}
                          </span>
                          <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
                {/* Display the total price */}
                <div className="mt-2 text-sm font-semibold">
                  Total Price: Rs {totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600"
                  onClick={async () => {
                    const latestTable = tables.find((t) => t._id === table._id);
                    if (latestTable) printInvoice(latestTable);
                  }}
                >
                  Print Invoice
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                  onClick={() => clearTableData(table._id)}
                >
                  Clear Table
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillingTables;