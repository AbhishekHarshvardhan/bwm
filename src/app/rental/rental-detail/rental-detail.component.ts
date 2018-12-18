import { RentalService } from "./../rental.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Rental } from "../rental";

@Component({
  selector: "app-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.css"]
})
export class RentalDetailComponent implements OnInit {
  currentRentalId: string;
  rental: Rental;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.currentRentalId = data.get("rentalId");
      this.getRentalDetails(this.currentRentalId);
    });
  }

  getRentalDetails(rentalId) {
    this.rental = this.rentalService.getRental(rentalId);
  }
}
