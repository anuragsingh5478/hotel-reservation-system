const express = require("express");
const router = express.Router();

var bookingController = require("../controllers/bookingController");
var bookingCancellationController = require("../controllers/bookingCancellationController");

const verifyRoute = require("./verifyRoute");

router.get("/allBookingsList", verifyRoute, bookingController.allBookingList);

router.get(
  "/userBookingsList",
  verifyRoute,
  bookingController.getUsersBookingList
);

router.get(
  "/bookinginfo/:bookingid",
  verifyRoute,
  bookingController.getBookingInfo
);

router.post("/create", verifyRoute, bookingController.createBooking);

router.post(
  "/edit",
  verifyRoute,
  bookingCancellationController.partialCancellation
);

router.post(
  "/cancel",
  verifyRoute,
  bookingCancellationController.fullCancellation
);

module.exports = router;
