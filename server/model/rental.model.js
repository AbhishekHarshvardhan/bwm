const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  city: String,
  street: String,
  category: String,
  image: String,
  bedroom: Number,
  description: String,
  dailyRate: Number,
  shared: Boolean,
  createdAt: { type: Date, default: Date.now },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
});

module.exports = mongoose.model("Rental", rentalSchema);
