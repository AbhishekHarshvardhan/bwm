import { RentalService } from "./../rental.service";
import { Component, OnInit } from "@angular/core";
import { Rental } from "../rental";

@Component({
  selector: "app-rental-list",
  templateUrl: "./rental-list.component.html",
  styleUrls: ["./rental-list.component.css"]
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.rentals = this.rentalService.getRentals();
  }
}
