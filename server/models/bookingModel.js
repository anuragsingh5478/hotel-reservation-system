const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
  user_id: String,
  booking_date: Date,
  checkin_date: Date,
  checkout_date: Date,
  number_of_days: Number,
  number_of_rooms: Number,
  cost: Number,
  refund: Number,
  status: String,
});

var Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
