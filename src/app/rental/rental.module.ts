import { NgModule } from "@angular/core";
import { RentalComponent } from "./rental.component";
import { CommonModule } from "@angular/common";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from "ngx-pipes";
import { MapModule } from "../common/map/map.module";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ":rentalId", component: RentalDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {}
