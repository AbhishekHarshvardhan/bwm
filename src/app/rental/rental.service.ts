import { Rental } from "./rental";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  rentals: Rental[] = [
    {
      id: "1",
      title: "Central Apartment",
      city: "New York",
      street: "Times Square",
      category: "Apartment",
      image: "https://bit.ly/2S7CiBU",
      bedroom: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/7/2018"
    },
    {
      id: "2",
      title: "Central Apartment 2",
      city: "San Francisco",
      street: "Times Square",
      category: "Condo",
      image: "https://bit.ly/2S7CiBU",
      bedroom: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/7/2018"
    },
    {
      id: "3",
      title: "Central Apartment 3",
      city: "Bratislava",
      street: "Halvana",
      category: "Condo",
      image: "https://bit.ly/2S7CiBU",
      bedroom: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/7/2018"
    },
    {
      id: "4",
      title: "Central Apartment 4",
      city: "Berlin",
      street: "Haupt strasse",
      category: "House",
      image: "https://bit.ly/2S7CiBU",
      bedroom: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/7/2018"
    }
  ];

  constructor() {}

  getRentals(): Rental[] {
    return this.rentals;
  }
  getRental(rentalId): Rental {
    return this.rentals.find(eachRental => {
      return (eachRental.id = rentalId);
    });
  }
}
