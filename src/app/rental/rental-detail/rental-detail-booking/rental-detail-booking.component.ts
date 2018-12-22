import { Rental } from "./../../rental";
import { Component, OnInit, Input } from "@angular/core";
import { Moment } from "moment";

@Component({
  selector: "app-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.css"]
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  selected: { startDate: Moment; endDate: Moment };

  constructor() {}

  ngOnInit() {}
}
