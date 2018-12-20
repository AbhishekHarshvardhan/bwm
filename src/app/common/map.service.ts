import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapService {
  private geoCoder;
  constructor() {}

  geocodeLocation(location: string): Observable<any> {
    this.geoCoder = new (<any>window).google.maps.Geocoder();
    return new Observable(observer => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const geometry = result[0].geometry.location;
          return observer.next({
            lat: geometry.lat(),
            lng: geometry.lng()
          });
        } else {
          observer.error("Location cannot be geocoded");
        }
      });
    });
  }
}
