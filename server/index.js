const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/dev");
const app = express();

//including all the routes
const rentalRoute = require("./routes/rentals");
const userRoute = require("./routes/users");

mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true }
);

//Using body-parser middleware to parse json request
app.use(bodyParser.json());

//redirecting to the routes
app.use("/api/v1/rentals", rentalRoute);
app.use("/api/v1/users", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
