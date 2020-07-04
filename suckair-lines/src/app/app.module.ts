import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';

import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { TimeoutService } from './timeout.service';
import { Boeing737Component } from './boeing737/boeing737.component';
import { Boeing787Component } from './boeing787/boeing787.component';
import { BombardierComponent } from './bombardier/bombardier.component';
import { LoginComponent } from './login/login.component';
import { FlightdetailsComponent } from './flightdetails/flightdetails.component';
import { ConnectionService} from './connection.service'
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'', redirectTo:"/flight", pathMatch:"full"},
  {path: 'flight', component: FlightComponent },
  {path: 'summary', component: SummaryComponent },
  {path: 'login', component: LoginComponent },
  {path: 'bombardier', component: BombardierComponent },
  {path: 'boeing737', component: Boeing737Component },
  {path: 'boeing787', component: Boeing787Component },
  {path: 'flightdetails', component: FlightdetailsComponent },
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule],
  declarations: [ AppComponent, FlightComponent, SummaryComponent, Boeing737Component, Boeing787Component, BombardierComponent, LoginComponent, FlightdetailsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [TimeoutService, ConnectionService]
})
export class AppModule { }
