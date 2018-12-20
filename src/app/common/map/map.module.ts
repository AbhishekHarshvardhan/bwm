import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "../map/map.component";

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM"
    })
  ],
  exports: [MapComponent]
})
export class MapModule {}
