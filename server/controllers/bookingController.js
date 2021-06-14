const Booking = require("../models/bookingModel");
const fs = require("fs");
//To read the data from charge.json to know the room price and processing charge
var rawdata = fs.readFileSync("./data/room.json");
var roomInfo = JSON.parse(rawdata);

exports.allBookingList = function (req, res) {
  Booking.find((err, bookings) => {
    res.json({ msg: "success", allBookings: bookings });
  });
};

exports.getUsersBookingList = function (req, res) {
  var userId = req.user_id;
  Booking.find({ user_id: userId, status: "active" }).then((bookings) => {
    res.json({ msg: "success", allBookings: bookings });
  });
};

exports.getBookingInfo = function (req, res) {
  var bookingId = req.params.bookingid;

  Booking.findById(bookingId)
    .then((booking) => res.send(booking))
    .catch((err) => {
      console.log(err);
    });
};

// create a new booking
// Note - date format mm/dd/yyyy in string
exports.createBooking = function (req, res) {
  var bookingDetails = req.body;
  let newBooking = new Booking({
    user_id: req.user_id, //bookingDetails.user_id
    booking_date: new Date(bookingDetails.booking_date),
    checkin_date: new Date(bookingDetails.checkin_date),
    checkout_date: new Date(bookingDetails.checkout_date),
    number_of_days: calcNumberOfDays(
      bookingDetails.checkin_date,
      bookingDetails.checkout_date
    ),
    number_of_rooms: bookingDetails.number_of_rooms,
    cost: calcNewCost(
      calcNumberOfDays(
        bookingDetails.checkin_date,
        bookingDetails.checkout_date
      ),
      bookingDetails.number_of_rooms
    ),
    refund: 0,
    status: "active",
  });

  newBooking.save().then(
    (booking) => {
      console.log("booking saved");
    },
    (err) => {
      console.log("error" + err);
    }
  );
  res.json({ msg: "success" });
};

//calc number of days
function calcNumberOfDays(a, b) {
  const utc1 = new Date(a);
  const utc2 = new Date(b);
  return Math.abs(Math.floor(utc2 - utc1) / (1000 * 60 * 60 * 24));
}

//calc new cost
function calcNewCost(numberOfDays, numberOfRooms) {
  return Math.ceil(
    numberOfRooms * numberOfDays * roomInfo.cost_per_room_per_day
  );
}
