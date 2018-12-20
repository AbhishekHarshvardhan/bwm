import { Rental } from "./rental";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class RentalService {
  rentals: Rental[] = [];

  constructor(private httpClient: HttpClient) {}

  getRentals() {
    return this.httpClient.get("/api/v1/rentals");
  }
  getRental(rentalId) {
    return this.httpClient.get("/api/v1/rentals/" + rentalId);
  }
}
