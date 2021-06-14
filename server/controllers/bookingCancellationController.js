const Booking = require("../models/bookingModel");
const fs = require("fs");
//To read the data from charge.json to know the room price and processing charge
var rawdata = fs.readFileSync("./data/room.json");
var roomInfo = JSON.parse(rawdata);

exports.partialCancellation = function (req, res) {
  var bookingId = req.body._id;
  Booking.findById(bookingId).then((bookingDetails) => {
    var updatedBookingInfo = req.body;
    console.log(bookingDetails);
    //updating checkout date
    bookingDetails.checkout_date = Date(updatedBookingInfo.checkout_date);
    //calc and updating number of days
    bookingDetails.number_of_days = calcNumberOfDays(
      updatedBookingInfo.checkin_date,
      updatedBookingInfo.checkout_date
    );
    var numberOfDays = bookingDetails.number_of_days;
    // console.log("number of days:" + numberOfDays);

    //calc number of days left for checkin
    var numberOfDaysForCheckin = calcNumberOfDaysForCheckin(
      bookingDetails.checkin_date
    );

    //updating number of rooms
    bookingDetails.number_of_rooms = Number(updatedBookingInfo.number_of_rooms);
    var numberOfRooms = bookingDetails.number_of_rooms;
    console.log(bookingDetails.number_of_rooms);

    //calc old cost
    var oldCost = bookingDetails.cost;

    //calc and updating new cost
    var newCost = calcNewCost(Number(numberOfDays), Number(numberOfRooms));
    bookingDetails.cost = newCost;

    //calc and updating refund
    bookingDetails.refund = calcRefundForPartialCancellation(
      Number(numberOfDaysForCheckin),
      Number(oldCost),
      Number(newCost)
    );

    bookingDetails
      .save()
      .then(() => {
        console.log("partial cancellation done");
        res.json({ msg: "success" });
      })
      .catch(() => {
        console.log("err");
        res.json({ msg: "err" });
      });
  });
};

exports.fullCancellation = function (req, res) {
  var bookingId = req.body._id;
  Booking.findById(bookingId).then((bookingDetails) => {
    bookingDetails.status = "cancelled";
    //calc number of Days left for checkin
    var numberOfDaysForCheckin = calcNumberOfDaysForCheckin(
      bookingDetails.checkin_date
    );
    //cost of booking
    var cost = bookingDetails.cost;
    bookingDetails.refund = calcRefundForFullCancellation(
      Number(numberOfDaysForCheckin),
      Number(cost)
    );

    bookingDetails
      .save()
      .then(() => {
        console.log("full cancellation done");
        res.json({ msg: "success" });
      })
      .catch(() => {
        console.log("err");
        res.json({ msg: "err" });
      });
  });
};

//calc remaining days for checkin
function calcNumberOfDaysForCheckin(checkin_date) {
  const utc1 = Date.now();
  const utc2 = new Date(checkin_date);

  return Math.floor(utc2 - utc1) / (1000 * 60 * 60 * 24);
}
//calc number of days
function calcNumberOfDays(a, b) {
  const utc1 = new Date(a);
  const utc2 = new Date(b);
  return Math.abs(Math.floor(utc2 - utc1) / (1000 * 60 * 60 * 24));
}

//calc new cost
function calcNewCost(numberOfDays, numberOfRooms) {
  return numberOfRooms * numberOfDays * roomInfo.cost_per_room_per_day;
}

//calc refund for partial cancellation
function calcRefundForPartialCancellation(
  numberOfDaysForCheckin,
  oldCost,
  newCost
) {
  if (numberOfDaysForCheckin <= 7) {
    //if numberOfDaysForCheckin is less than 7 then 30% reduction is done
    return (oldCost - newCost) * 0.7 - roomInfo.processing_cost;
  } else {
    //no deduction
    return oldCost - newCost - roomInfo.processing_cost;
  }
}

//calc refund for full cancellation
function calcRefundForFullCancellation(numberOfDaysForCheckin, cost) {
  if (numberOfDaysForCheckin <= 7) {
    //if numberOfDaysForCheckin is less than 7 then 30% reduction is done
    return cost * 0.7 - roomInfo.processing_cost;
  } else {
    //no deduction
    return cost - roomInfo.processing_cost;
  }
}
