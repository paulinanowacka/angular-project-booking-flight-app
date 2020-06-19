import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';

import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path:'', redirectTo:"/flight", pathMatch:"full"},
  {path: 'flight', component: FlightComponent },
  {path: 'summary', component: SummaryComponent }
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, FlightComponent, SummaryComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
