const express = require("express");
const router = express.Router();

var bookingController = require("../controllers/bookingController");
var bookingCancellationController = require("../controllers/bookingCancellationController");

router.get("/", bookingController.allBookingList);

router.get("/user/:id", bookingController.getUsersBookingList);

router.get("/user/bookinginfo/:bookingid", bookingController.getBookingInfo);

router.post("/create", bookingController.createBooking);

router.post("/edit", bookingCancellationController.partialCancellation);

router.post("/cancel", bookingCancellationController.fullCancellation);

module.exports = router;
