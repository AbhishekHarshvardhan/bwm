const Rental = require("./rental.model");

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: "Central Apartment",
        city: "New York",
        street: "Times Square",
        category: "Apartment",
        image: "https://bit.ly/2S7CiBU",
        bedroom: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false
      },
      {
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Times Square",
        category: "Condo",
        image: "https://bit.ly/2SZ6IX4",
        bedroom: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false
      },
      {
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Halvana",
        category: "Condo",
        image: "https://bit.ly/2T0cd7V",
        bedroom: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false
      },
      {
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "House",
        image: "https://bit.ly/2A7n096",
        bedroom: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false
      }
    ];
  }
  pushRentalToDb() {
    this.rentals.forEach(element => {
      const newRental = new Rental(element);
      newRental.save();
    });
  }
  seedDB() {
    this.pushRentalToDb();
  }
}
module.exports = FakeDb;
