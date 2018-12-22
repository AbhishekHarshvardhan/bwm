const Booking = require("../model/booking.model");
const Rental = require("../model/rental.model");
const User = require("../model/user.model");
const moment = require("moment");
const { normalizeMongooseError } = require("../helpers/mongoose.helper");

exports.booking = (req, res) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });
  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec(function(err, foundRental) {
      if (err) return res.status(422).send({ error: normalizeMongooseError(error.errors) });

      //returning error if booking is done by rental owner
      if (foundRental.user._id === user._id) {
        return res
          .status(422)
          .send({ error: [{ title: "Invalid User!", details: "Cannot create booking on your Rental!" }] });
      }

      //returning error if not a valid booking dates
      if (!isValidBooking(booking, foundRental)) {
        console.log(foundRental);
        return res.status(422).send({ error: [{ title: "Invalid Booking!", details: "Choosen dates are already taken!" }] });
      }
      //saving booking if no errors occured
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);
      booking.save(err => {
        if (err) return res.status(422).send({ error: normalizeMongooseError(error.errors) });
        foundRental.save();
        User.update({ _id: user._id }, { $push: { bookings: booking } });
        return res.json({ startAt: booking.startAt, endAt: booking.endAt });
      });
    });
};

isValidBooking = (proposedBooking, rental) => {
  let isValid = true;
  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(booking => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });

    return isValid;
  }
};
