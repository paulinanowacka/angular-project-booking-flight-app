import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HostListener} from "@angular/core";
@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.scss"]
})
export class FlightComponent implements OnInit {
  constructor(private router: Router) {
    this.showStorage = localStorage.getItem("flightdetails") || {};
  }

  ngOnInit() {
    this.resetTimer();
  }
  public time: any;
  public numberOfPassengers: number = 1;
  public departureDate: any;
  public returnDate: any;
  public departureAirport: string;
  public destinationAirport: string;
  public showStorage: any;
  public today = new Date();
  public todayShort = new Date().toISOString().slice(0,10);

  public cities = ["Warsaw", "Paris", "New York"];
  public opts = [
    { key: "Warsaw", value: ["paris,new york"] },
    { key: "Paris", value: ["warsaw,new york"] },
    { key: "New York", value: ["warsaw, paris,"] }
  ];

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  resetTimer() {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
    localStorage.removeItem("flightdetails");
    alert("You have been inactive for 15 seconds. Please start again.");
    this.router.navigate(["/flight"]);
    }, 180000);
  }

  saving() {
    localStorage.removeItem("flightdetails");
    let dataStorage = {
      departureDate: this.departureDate,
      returnDate: this.returnDate,
      departureAirport: this.departureAirport,
      arrivalAirport: this.destinationAirport,
      passengersNumber: this.numberOfPassengers
    };
    localStorage.setItem("flightdetails", JSON.stringify(dataStorage));
    this.showStorage = JSON.parse(localStorage.getItem("flightdetails"));
  }

  delete() {
    localStorage.removeItem("flightdetails");
  }
}
