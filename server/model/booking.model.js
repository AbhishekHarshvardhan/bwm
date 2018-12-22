const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  startAt: { type: Date, required: "Ending Date is required" },
  endAt: { type: Date, required: "Start Date is required" },
  totalPrice: Number,
  guests: Number,
  days: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rental: { type: Schema.Types.ObjectId, ref: "Rental" }
});

module.exports = mongoose.model("Booking", BookingSchema);
