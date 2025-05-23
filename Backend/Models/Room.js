import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, default: "" },
  checkinDate: { type: Date, default: null },
  checkoutDate: { type: Date, default: null },
  checkinTime: { type: String, default: "12:00" },
  checkoutTime: { type: String, default: "12:00" },
  noOfPersons: { type: Number, default: 0 },
  idProof: { type: String, default: "" },
  pricePerDate: { type: Number, default: 0 },
  orders: [
    {
      itemName: { type: String, default: "" },
      price: { type: Number, default: 0 },
      quantity: { type: Number, default: 0 },
      paid: { type: Boolean, default: false },
    },
  ],
  addedDetails: { type: Object, default: null }
});

export default mongoose.model("Room", RoomSchema);