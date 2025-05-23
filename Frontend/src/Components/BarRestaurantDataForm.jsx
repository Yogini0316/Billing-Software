import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus, FaPrint } from "react-icons/fa";
import axios from "axios";

const BarRestaurantDataForm = () => {
  const API_URL = "/api/v1/orders"; // Backend API endpoint for orders
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    counter: "",
    price: "",
    lodgingPrice: "",
    parcelPrice: "",
    type: "",
    quantity: "",
  });

  const [dataList, setDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch all orders from the backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.code ||
      !formData.name ||
      !formData.price ||
      !formData.type ||
      !formData.quantity
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    // Prepare the order data
    const orderData = {
      orderNumber: formData.code, // Use code as order number
      customerName: formData.name,
      items: [
        {
          name: formData.type,
          quantity: formData.quantity,
          price: formData.price,
          total: formData.quantity * formData.price,
        },
      ],
      totalAmount: formData.quantity * formData.price,
    };

    try {
      if (editIndex !== null) {
        // Update existing order
        const response = await axios.put(
          `${API_URL}/${dataList[editIndex]._id}`,
          orderData
        );
        const updatedList = dataList.map((item, index) =>
          index === editIndex ? response.data : item
        );
        setDataList(updatedList);
        setEditIndex(null);
      } else {
        // Create new order
        const response = await axios.post(API_URL, orderData);
        setDataList([...dataList, response.data]);
      }

      // Reset form data
      setFormData({
        code: "",
        name: "",
        counter: "",
        price: "",
        lodgingPrice: "",
        parcelPrice: "",
        type: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleEdit = (index) => {
    const order = dataList[index];
    setFormData({
      code: order.orderNumber,
      name: order.customerName,
      counter: "", // Not part of the order model
      price: order.items[0].price,
      lodgingPrice: "", // Not part of the order model
      parcelPrice: "", // Not part of the order model
      type: order.items[0].name,
      quantity: order.items[0].quantity,
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/${dataList[index]._id}`);
      const updatedList = dataList.filter((_, i) => i !== index);
      setDataList(updatedList);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handlePrint = (order) => {
    const printWindow = window.open("", "Print", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              text-align: center;
              color: #1a365d;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Order Details</h1>
          <table>
            <tr>
              <th>Order Number</th>
              <td>${order.orderNumber}</td>
            </tr>
            <tr>
              <th>Customer Name</th>
              <td>${order.customerName}</td>
            </tr>
            <tr>
              <th>Item</th>
              <td>${order.items[0].name}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>${order.items[0].quantity}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>${order.items[0].price}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>${order.items[0].total}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>${order.totalAmount}</td>
            </tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const formFields = [
        "code",
        "name",
        "counter",
        "price",
        "lodgingPrice",
        "parcelPrice",
        "type",
        "quantity",
      ];
      const currentIndex = formFields.findIndex((field) => field === e.target.name);

      if (currentIndex < formFields.length - 1) {
        const nextField = document.querySelector(
          `[name="${formFields[currentIndex + 1]}"]`
        );
        nextField?.focus();
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold mb-6 text-center text-blue-600">
        Bar and Restaurant Data Form
      </h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300"
        onSubmit={handleAddEdit}
      >
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          required
        />
        <input
          type="text"
          name="counter"
          placeholder="Counter"
          value={formData.counter}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        />
        <input
          type="number"
          name="lodgingPrice"
          placeholder="Lodging Price"
          value={formData.lodgingPrice}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        />
        <input
          type="number"
          name="parcelPrice"
          placeholder="Parcel Price"
          value={formData.parcelPrice}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="p-4 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          required
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 lg:col-span-3 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition ease-in-out flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          {editIndex !== null ? "Edit" : "Add"}
        </button>
      </form>

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg border border-gray-300 rounded-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Code</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Counter</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Price</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Lodging Price</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Parcel Price</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Type</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Quantity</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-800 border">{item.orderNumber}</td>
                <td className="p-4 text-sm text-gray-800 border">{item.customerName}</td>
                <td className="p-4 text-sm text-gray-800 border">-</td>
                <td className="p-4 text-sm text-gray-800 border">{item.items[0].price}</td>
                <td className="p-4 text-sm text-gray-800 border">-</td>
                <td className="p-4 text-sm text-gray-800 border">-</td>
                <td className="p-4 text-sm text-gray-800 border">{item.items[0].name}</td>
                <td className="p-4 text-sm text-gray-800 border">{item.items[0].quantity}</td>
                <td className="p-4 text-sm text-gray-800 border">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition ease-in-out"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-red-700 transition ease-in-out"
                    >
                      <FaTrashAlt className="mr-2" />
                      Delete
                    </button>
                    <button
                      onClick={() => handlePrint(item)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-700 transition ease-in-out"
                    >
                      <FaPrint className="mr-2" />
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarRestaurantDataForm;