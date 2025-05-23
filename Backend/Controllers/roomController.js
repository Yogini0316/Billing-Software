import Room from "../Models/Room.js";

// Create a new room
const createRoom = async (req, res) => {
  const defaultRoom = {
    roomNumber: "",
    checkinDate: null,
    checkoutDate: null,
    checkinTime: "12:00",
    checkoutTime: "12:00",
    noOfPersons: 0,
    idProof: "",
    pricePerDate: 0,
    orders: [],
    addedDetails: null
  };

  const newRoom = new Room({ ...defaultRoom, ...req.body });
  
  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a room by ID
const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { 
      new: true,
      runValidators: true 
    });
    
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a room by ID
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createRoom, getRooms, getRoomById, updateRoom, deleteRoom };