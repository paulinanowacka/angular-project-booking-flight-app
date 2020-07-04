import { Component, OnInit } from '@angular/core';
import { TimeoutService } from '../timeout.service';

// const MAX_SEATS = 9;

@Component({
  selector: 'app-bombardier',
  templateUrl: './bombardier.component.html',
  styleUrls: ['./bombardier.component.scss']
})
export class BombardierComponent implements OnInit {

  constructor(private timeoutService: TimeoutService) {
    this.showStorage = JSON.parse(localStorage.getItem("flightdetails")) || {};
  }

    ngOnInit() {
    this.timeoutService.resetTimer();
  }

  counter = 0;
  public chosenSeat: any;
  public seatsList = [];
  public showStorage;
  public chosenPlane = "bombardier";
  public alert = "";
  public existingData = localStorage.getItem("flightdetails")

  onClick($event) {
    const seat = $event.target.closest('.st14');
    const reserved = seat.getAttribute("class").indexOf('occupied');

    this.chosenSeat = seat.getAttribute("id");

    if (reserved > -1) {
      seat.removeAttribute("style");
      seat.setAttribute("class", "free st14");
      const toRemove = this.seatsList.indexOf(this.chosenSeat);
      this.seatsList.splice(toRemove,1);
      this.counter -= 1;
  // } else if (this.counter < MAX_SEATS) {
  } else if (this.counter < this.showStorage.passengersNumber) {
      seat.removeAttribute("style");
      seat.setAttribute("class", "occupied st14");
      this.seatsList.push(this.chosenSeat)
      this.counter += 1;
  // } else if (this.counter == MAX_SEATS) {
  } else if (this.counter == this.showStorage.passengersNumber) {
    alert(`You have reached maximum selection of seats for ${this.showStorage.passengersNumber} passengers.`)
  }
  localStorage.setItem("chosenSeats", JSON.stringify(this.seatsList));
  }
  saveData() {
    this.existingData = this.existingData ? JSON.parse(this.existingData) : {};
    this.existingData["chosenPlane"] = this.chosenPlane;
    localStorage.setItem("flightdetails", JSON.stringify(this.existingData))
  }
}

