const express = require("express");
const router = express.Router();
const Rental = require("../model/rental.model");

const userController = require("../controller/user.controller");

router.get("/secret", userController.authMiddleware, (req, res) => {
  res.json({ secret: true });
});

router.get("", (req, res) => {
  Rental.find({}, (error, dbRentals) => {
    res.json(dbRentals);
  });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId, (error, dbRental) => {
    if (error) {
      res.status(422).send({
        error: [{ title: "Rental Error!", detail: "Could not found Rental!" }]
      });
    }
    res.json(dbRental);
  });
});
module.exports = router;
