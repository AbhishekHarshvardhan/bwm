const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const app = express();
const rentalRoute = require("./routes/rentals");
//const FakeDb = require("./model/fake-db");

mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true }
);

app.use("/api/v1/rentals", rentalRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
