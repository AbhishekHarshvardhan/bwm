const express = require("express");
const router = express.Router();
const Booking = require("../model/booking.model");

const BookingController = require("../controller/booking.controller");
const UserController = require("../controller/user.controller");

router.post("", UserController.authMiddleware, BookingController.booking);

module.exports = router;
