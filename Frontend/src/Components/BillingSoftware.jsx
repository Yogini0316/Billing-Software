import React, { useState } from "react";

const BillingSoftware = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const addItem = () => {
    if (itemName && itemPrice > 0 && itemQuantity > 0) {
      setItems([
        ...items,
        { name: itemName, price: parseFloat(itemPrice), quantity: parseInt(itemQuantity) },
      ]);
      setItemName("");
      setItemPrice("");
      setItemQuantity(1);
    } else {
      alert("Please enter valid item details.");
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const clearBill = () => {
    setItems([]);
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bar & Restaurant Billing</h2>
      <div className="mb-4">
        <label className="block font-medium">Item Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Item Price:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Quantity:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={addItem}
      >
        Add Item
      </button>

      <div className="mt-5">
        <h3 className="text-xl font-bold mb-3">Bill Summary</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <ul className="mb-4">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>
                  {item.quantity} x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
          onClick={clearBill}
        >
          Clear Bill
        </button>
      </div>
    </div>
  );
};

export default BillingSoftware;
