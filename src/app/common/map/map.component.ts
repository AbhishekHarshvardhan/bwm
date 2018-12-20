import { MapService } from "./../map.service";
import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}
  @Input() location: string;
  public isLocationError: Boolean = false;

  lat: number = 51.678418;
  lng: number = 7.809007;
  ngOnInit() {}

  mapReadyHandler() {
    this.mapService.geocodeLocation(this.location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      error => {
        this.isLocationError = true;
      }
    );
  }
}
