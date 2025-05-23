import React, { useState, useEffect } from "react";
import axios from "axios";

const RoomBooking = () => {
  const API_URL = "/api/v1/rooms";
  const [rooms, setRooms] = useState([]);
  const [orderInput, setOrderInput] = useState({
    itemName: "",
    price: "",
    quantity: "",
    paid: false,
  });
  const [disableInputs, setDisableInputs] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(API_URL);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const addRoom = async () => {
    const newRoom = {
      roomNumber: "",
      checkinDate: "",
      checkoutDate: "",
      checkinTime: "12:00",
      checkoutTime: "12:00",
      noOfPersons: 0,
      idProof: "",
      pricePerDate: 0,
      orders: [],
      addedDetails: null
    };

    try {
      const response = await axios.post(API_URL, newRoom);
      setRooms((prevRooms) => [...prevRooms, response.data]);
      setDisableInputs(false);
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Please try again.");
    }
  };

  const updateRoomDetails = async (roomId, field, value) => {
    const updatedRoom = rooms.find((room) => room._id === roomId);
    
    // Convert empty strings to appropriate default values
    let processedValue = value;
    if (value === "") {
      if (field === "noOfPersons" || field === "pricePerDate") {
        processedValue = 0;
      }
    }

    if (field === "checkinDate" || field === "checkoutDate") {
      updatedRoom[field] = value ? new Date(value).toISOString().split("T")[0] : null;
    } else {
      updatedRoom[field] = processedValue;
    }

    try {
      const response = await axios.put(`${API_URL}/${roomId}`, updatedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === roomId ? response.data : room))
      );
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const calculateTotalRent = (checkinDate, checkoutDate, pricePerDate) => {
    if (!checkinDate || !checkoutDate || !pricePerDate) return 0;

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const differenceInTime = checkout.getTime() - checkin.getTime();
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

    return differenceInDays > 0
      ? Math.round(differenceInDays * pricePerDate)
      : pricePerDate;
  };

  const menuItems = [
    // Veg Items
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

  const addOrderToRoom = async (roomId) => {
    if (!orderInput.itemName || !orderInput.price || !orderInput.quantity) {
      alert("Please fill out all order fields before adding an order.");
      return;
    }

    const orderToAdd = {
      itemName: orderInput.itemName,
      price: Number(orderInput.price),
      quantity: Number(orderInput.quantity),
      paid: orderInput.paid
    };

    try {
      const room = rooms.find((room) => room._id === roomId);
      const updatedRoom = {
        ...room,
        orders: [...room.orders, orderToAdd]
      };

      const response = await axios.put(`${API_URL}/${roomId}`, updatedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === roomId ? response.data : room))
      );
      setOrderInput({ itemName: "", price: "", quantity: "", paid: false });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const clearRoom = async (roomId) => {
    const clearedRoom = {
      roomNumber: "",
      checkinDate: "",
      checkoutDate: "",
      checkinTime: "12:00",
      checkoutTime: "12:00",
      noOfPersons: 0,
      idProof: "",
      pricePerDate: 0,
      orders: [],
      addedDetails: null
    };

    try {
      const response = await axios.put(`${API_URL}/${roomId}`, clearedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === roomId ? response.data : room))
      );
      setDisableInputs(false);
    } catch (error) {
      console.error("Error clearing room:", error);
    }
  };

  const printRoomDetails = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    const totalRent = room.addedDetails?.totalRent ||
      calculateTotalRent(room.checkinDate, room.checkoutDate, room.pricePerDate);
    const totalOrderPrice = room.orders.reduce(
      (total, order) => total + order.price * order.quantity, 0
    );
    const grandTotal = totalRent + totalOrderPrice;

    const printableContent = `
      <html>
        <head>
          <title>Room Details</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
            
            body { 
              font-family: 'Poppins', sans-serif; 
              padding: 30px; 
              color: #333;
              max-width: 800px;
              margin: 0 auto;
            }
            
            .invoice-container {
              border: 2px solid #4a6fdc;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .invoice-header {
              background: linear-gradient(135deg, #4a6fdc, #3a56b0);
              color: white;
              padding: 30px;
              text-align: center;
              border-bottom: 5px solid #e4a101;
            }
            
            .invoice-header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            
            .hotel-info {
              margin-top: 10px;
              font-size: 14px;
              opacity: 0.9;
            }
            
            .invoice-title {
              background-color: #f8f9fa;
              padding: 15px 30px;
              border-bottom: 1px solid #e0e0e0;
              font-weight: 600;
              font-size: 18px;
              color: #4a6fdc;
            }
            
            .invoice-body {
              padding: 30px;
            }
            
            .section {
              margin-bottom: 30px;
            }
            
            .section-title {
              font-weight: 600;
              font-size: 16px;
              color: #4a6fdc;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 8px;
              margin-bottom: 15px;
            }
            
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            
            .detail-item {
              margin-bottom: 10px;
            }
            
            .detail-label {
              font-weight: 600;
              color: #666;
              display: inline-block;
              min-width: 150px;
            }
            
            .detail-value {
              font-weight: 500;
            }
            
            .orders-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            
            .orders-table th {
              background-color: #f8f9fa;
              padding: 12px 15px;
              text-align: left;
              font-weight: 600;
              border-bottom: 2px solid #e0e0e0;
            }
            
            .orders-table td {
              padding: 12px 15px;
              border-bottom: 1px solid #f0f0f0;
            }
            
            .orders-table tr:last-child td {
              border-bottom: none;
            }
            
            .totals {
              margin-top: 30px;
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              font-size: 16px;
            }
            
            .grand-total {
              font-weight: 700;
              font-size: 20px;
              color: #4a6fdc;
              border-top: 2px solid #e0e0e0;
              padding-top: 15px;
              margin-top: 15px;
            }
            
            .invoice-footer {
              text-align: center;
              padding: 20px;
              background-color: #f8f9fa;
              border-top: 1px solid #e0e0e0;
              font-size: 14px;
              color: #666;
            }
            
            .thank-you {
              font-weight: 600;
              color: #4a6fdc;
              margin-bottom: 10px;
            }
            
            .watermark {
              opacity: 0.1;
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 80px;
              font-weight: 700;
              color: #4a6fdc;
              pointer-events: none;
              z-index: -1;
            }
            
            .status-paid {
              color: #28a745;
              font-weight: 600;
            }
            
            .status-unpaid {
              color: #dc3545;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <h1> HOTEL GRAND PLAZA </h1>
              <div class="hotel-info">
                <p>123 Main Street, City Center • Bangalore, Karnataka - 560001</p>
                <p>Phone: +91 9876543210 • Email: info@grandplaza.com</p>
              </div>
            </div>
            
            <div class="invoice-title">
              INVOICE #${Math.floor(100000 + Math.random() * 900000)}
            </div>
            
            <div class="invoice-body">
              <div class="watermark">GRAND PLAZA</div>
              
              <div class="section">
                <div class="section-title">GUEST DETAILS</div>
                <div class="details-grid">
                  <div class="detail-item">
                    <span class="detail-label">Room Number:</span>
                    <span class="detail-value">${room.roomNumber || "N/A"}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Check-in Date:</span>
                    <span class="detail-value">${room.checkinDate || "N/A"} at ${room.checkinTime || "N/A"}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Check-out Date:</span>
                    <span class="detail-value">${room.checkoutDate || "N/A"} at ${room.checkoutTime || "N/A"}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Total Nights:</span>
                    <span class="detail-value">${calculateTotalDays(room.checkinDate, room.checkoutDate)}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">No. of Persons:</span>
                    <span class="detail-value">${room.noOfPersons || "N/A"}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">ID Proof:</span>
                    <span class="detail-value">${room.idProof || "N/A"}</span>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">ROOM CHARGES</div>
                <table class="orders-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Rate</th>
                      <th>Nights</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Room ${room.roomNumber || "N/A"}</td>
                      <td>Rs ${room.pricePerDate || "0"}/night</td>
                      <td>${calculateTotalDays(room.checkinDate, room.checkoutDate)}</td>
                      <td>Rs ${totalRent.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              ${room.orders.length > 0 ? `
              <div class="section">
                <div class="section-title">FOOD & BEVERAGES</div>
                <table class="orders-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${room.orders.map(
                      (order) => `
                    <tr>
                      <td>${order.itemName}</td>
                      <td>Rs ${order.price}</td>
                      <td>${order.quantity}</td>
                      <td class="${order.paid ? "status-paid" : "status-unpaid"}">
                        ${order.paid ? "Paid" : "Pending"}
                      </td>
                      <td>Rs ${(order.price * order.quantity).toFixed(2)}</td>
                    </tr>
                    `
                    ).join("")}
                  </tbody>
                </table>
              </div>
              ` : ""}
              
              <div class="totals">
                <div class="total-row">
                  <span>Room Charges:</span>
                  <span>Rs ${totalRent.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Food & Beverages:</span>
                  <span>Rs ${totalOrderPrice.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Tax (10%):</span>
                  <span>Rs ${(grandTotal * 0.1).toFixed(2)}</span>
                </div>
                <div class="total-row grand-total">
                  <span>TOTAL DUE:</span>
                  <span>Rs ${(grandTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div class="invoice-footer">
              <div class="thank-you">Thank you for staying with us!</div>
              <p>For any queries, please contact our front desk</p>
              <p>GSTIN: 29ABCDE1234F1Z5 • Subject to Bangalore Jurisdiction</p>
              <p>Invoice generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.print();
  };

  const calculateTotalDays = (checkinDate, checkoutDate) => {
    if (!checkinDate || !checkoutDate) return 0;

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const differenceInTime = checkout.getTime() - checkin.getTime();
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

    return differenceInDays > 0 ? Math.round(differenceInDays) : 1;
  };

  const handleAddRoomDetails = async (roomId) => {
    const room = rooms.find((r) => r._id === roomId);

    if (
      !room.roomNumber ||
      !room.checkinDate ||
      !room.checkoutDate ||
      !room.checkinTime ||
      !room.checkoutTime ||
      !room.noOfPersons ||
      !room.idProof ||
      !room.pricePerDate
    ) {
      alert("Please fill out all required fields before adding room details.");
      return;
    }

    const totalRent = calculateTotalRent(
      room.checkinDate,
      room.checkoutDate,
      room.pricePerDate
    );

    const updatedRoom = {
      ...room,
      addedDetails: {
        roomNumber: room.roomNumber,
        checkinDate: room.checkinDate,
        checkoutDate: room.checkoutDate,
        checkinTime: room.checkinTime,
        checkoutTime: room.checkoutTime,
        noOfPersons: room.noOfPersons,
        idProof: room.idProof,
        pricePerDate: room.pricePerDate,
        totalRent: totalRent,
        totalDays: calculateTotalDays(room.checkinDate, room.checkoutDate)
      },
    };

    try {
      const response = await axios.put(`${API_URL}/${roomId}`, updatedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === roomId ? response.data : room))
      );
      setDisableInputs(true);
    } catch (error) {
      console.error("Error adding room details:", error);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`${API_URL}/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={addRoom}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Room
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const totalRent = room.addedDetails?.totalRent ||
            calculateTotalRent(room.checkinDate, room.checkoutDate, room.pricePerDate);
          const totalOrderPrice = room.orders.reduce(
            (total, order) => total + order.price * order.quantity, 0
          );
          const grandTotal = totalRent + totalOrderPrice;

          return (
            <div
              key={room._id}
              className="border rounded p-4 shadow-md bg-white space-y-2"
            >
              <h2 className="font-bold text-lg">Room {room.roomNumber || "New Room"}</h2>

              {/* Room Details Section */}
              {room.addedDetails ? (
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <h3 className="font-semibold mb-2">Room Details:</h3>
                  <p><span className="font-medium">Check-in:</span> {room.addedDetails.checkinDate} at {room.addedDetails.checkinTime}</p>
                  <p><span className="font-medium">Check-out:</span> {room.addedDetails.checkoutDate} at {room.addedDetails.checkoutTime}</p>
                  <p><span className="font-medium">Persons:</span> {room.addedDetails.noOfPersons}</p>
                  <p><span className="font-medium">ID Proof:</span> {room.addedDetails.idProof}</p>
                  <p><span className="font-medium">Price per day:</span> Rs {room.addedDetails.pricePerDate}</p>
                  <p><span className="font-medium">Total days:</span> {room.addedDetails.totalDays}</p>
                  <p className="font-medium">Total Room Rent: Rs {totalRent}</p>

                  {/* Order Details Section */}
                  <div className="mt-3">
                    <h4 className="font-semibold">Order Details:</h4>
                    {room.orders.length > 0 ? (
                      <>
                        <div className="max-h-40 overflow-y-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="p-2 text-left border">Item</th>
                                <th className="p-2 text-left border">Price</th>
                                <th className="p-2 text-left border">Qty</th>
                                <th className="p-2 text-left border">Status</th>
                                <th className="p-2 text-left border">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {room.orders.map((order, idx) => (
                                <tr key={idx} className="border-t">
                                  <td className="p-2 border">{order.itemName}</td>
                                  <td className="p-2 border">Rs {order.price}</td>
                                  <td className="p-2 border">{order.quantity}</td>
                                  <td className="p-2 border">{order.paid ? "Paid" : "Not Paid"}</td>
                                  <td className="p-2 border">Rs {order.price * order.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-2">
                          <p className="font-medium">Total Orders: Rs {totalOrderPrice.toFixed(2)}</p>
                        </div>
                      </>
                    ) : (
                      <p>No orders added yet.</p>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t">
                    <p className="font-bold">Grand Total: Rs {grandTotal.toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Room Number"
                    value={room.roomNumber || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "roomNumber", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="number"
                    placeholder="Price per Day"
                    value={room.pricePerDate || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "pricePerDate", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="date"
                    placeholder="Check-in Date"
                    value={room.checkinDate ? room.checkinDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "checkinDate", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="date"
                    placeholder="Check-out Date"
                    value={room.checkoutDate ? room.checkoutDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "checkoutDate", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="time"
                    placeholder="Check-in Time"
                    value={room.checkinTime || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "checkinTime", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="time"
                    placeholder="Check-out Time"
                    value={room.checkoutTime || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "checkoutTime", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="No. of Persons"
                    value={room.noOfPersons || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "noOfPersons", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="ID Proof"
                    value={room.idProof || ""}
                    onChange={(e) =>
                      updateRoomDetails(room._id, "idProof", e.target.value)
                    }
                    disabled={disableInputs}
                    className="w-full p-2 border rounded"
                  />

                  <button
                    onClick={() => handleAddRoomDetails(room._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
                    disabled={
                      !room.roomNumber ||
                      !room.checkinDate ||
                      !room.checkoutDate ||
                      !room.checkinTime ||
                      !room.checkoutTime ||
                      !room.noOfPersons ||
                      !room.idProof ||
                      !room.pricePerDate
                    }
                  >
                    Confirm Room Details
                  </button>
                </div>
              )}

              {/* Add Order Section */}
              <div className="mt-4 border-t pt-3">
                <h3 className="font-bold">Add Order</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                <input
  type="text"
  list="menu-options"
  placeholder="Item Name"
  value={orderInput.itemName}
  onChange={(e) => {
    const selectedName = e.target.value;
    const selectedItem = menuItems.find(item => item.name === selectedName);
    
    setOrderInput((prev) => ({
      ...prev,
      itemName: selectedName,
      price: selectedItem ? selectedItem.price : '', // auto-fill price if matched
    }));
  }}
  className="w-full p-2 border rounded"
/>

<datalist id="menu-options">
  {menuItems.map((item, idx) => (
    <option key={idx} value={item.name} />
  ))}
</datalist>
<input
  type="number"
  placeholder="Price"
  value={orderInput.price}
  onChange={(e) =>
    setOrderInput((prev) => ({
      ...prev,
      price: e.target.value,
    }))
  }
  className="w-full p-2 border rounded"
/>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={orderInput.quantity}
                    onChange={(e) =>
                      setOrderInput((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded"
                  />
                  <select
                    value={orderInput.paid}
                    onChange={(e) =>
                      setOrderInput((prev) => ({
                        ...prev,
                        paid: e.target.value === "true",
                      }))
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value={false}>Not Paid</option>
                    <option value={true}>Paid</option>
                  </select>
                </div>
                <button
                  onClick={() => addOrderToRoom(room._id)}
                  className={`${!orderInput.itemName ||
                    !orderInput.price ||
                    !orderInput.quantity
                    ? "bg-gray-500"
                    : "bg-green-500"
                    } text-white px-4 py-2 rounded mt-2 w-full`}
                  disabled={
                    !orderInput.itemName || !orderInput.price || !orderInput.quantity
                  }
                >
                  Add Order
                </button>
              </div>

              {/* Preview Section - Above Print Button */}
              <div className="mt-4 border-t pt-3">
                <h3 className="font-bold mb-2">Booking Summary</h3>

                {/* Room Details Preview */}
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <h4 className="font-semibold">Room Details:</h4>
                  {room.roomNumber ? (
                    <>
                      <p><span className="font-medium">Room:</span> {room.roomNumber}</p>
                      <p><span className="font-medium">Check-in:</span> {room.checkinDate} at {room.checkinTime}</p>
                      <p><span className="font-medium">Check-out:</span> {room.checkoutDate} at {room.checkoutTime}</p>
                      <p><span className="font-medium">Persons:</span> {room.noOfPersons}</p>
                      <p><span className="font-medium">ID Proof:</span> {room.idProof}</p>
                      <p><span className="font-medium">Price per day:</span> Rs {room.pricePerDate}</p>
                      <p><span className="font-medium">Total days:</span> {calculateTotalDays(room.checkinDate, room.checkoutDate)}</p>
                      <p><span className="font-medium">Total Rent:</span> Rs {totalRent}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No room details added yet</p>
                  )}
                </div>

                {/* Order Details Preview */}
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-semibold">Order Details:</h4>
                  {room.orders.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="p-2 text-left border">Item</th>
                            <th className="p-2 text-left border">Price</th>
                            <th className="p-2 text-left border">Qty</th>
                            <th className="p-2 text-left border">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {room.orders.map((order, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="p-2 border">{order.itemName}</td>
                              <td className="p-2 border">Rs {order.price}</td>
                              <td className="p-2 border">{order.quantity}</td>
                              <td className="p-2 border">Rs {order.price * order.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-2">
                        <p><span className="font-medium">Total Orders:</span> Rs {totalOrderPrice.toFixed(2)}</p>
                        <p className="font-bold">Grand Total: Rs {grandTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No orders added yet</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => printRoomDetails(room._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Print Invoice
                </button>
                <button
                  onClick={() => clearRoom(room._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Clear Room
                </button>
                <button
                  onClick={() => deleteRoom(room._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete Room
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomBooking;