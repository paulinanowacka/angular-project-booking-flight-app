import { Component, OnInit } from '@angular/core';
import { TimeoutService } from '../timeout.service';

// const MAX_SEATS = 9;

@Component({
  selector: 'app-boeing737',
  templateUrl: './boeing737.component.html',
  styleUrls: ['./boeing737.component.scss']
})
export class Boeing737Component implements OnInit {

  constructor(private timeoutService: TimeoutService) {
    this.showStorage = JSON.parse(localStorage.getItem("flightdetails")) || {};
}


  public showStorage: any;

  ngOnInit() {
    this.timeoutService.resetTimer();
    console.log(this.showStorage);
    console.log(this.showStorage.passengersNumber)
  }

  counter = 0;
  public chosenSeat: any;
  public seatsList = [];
  public chosenPlane = "boeing737";
  public alert = "";
  public existingData = localStorage.getItem("flightdetails")


  onClick($event) {
    const seat = $event.target.closest('.st121');
    const reserved = seat.getAttribute("class").indexOf('occupied');

    this.chosenSeat = seat.getAttribute("id");

    if (reserved > -1) {
      seat.removeAttribute("style");
      seat.setAttribute("class", "free st121");
      const toRemove = this.seatsList.indexOf(this.chosenSeat);
      this.seatsList.splice(toRemove,1);
      this.counter -= 1;
  // } else if (this.counter < MAX_SEATS) {
  } else if (this.counter < this.showStorage.passengersNumber ) {
      seat.removeAttribute("style");
      seat.setAttribute("class", "occupied st121");
      this.seatsList.push(this.chosenSeat)
      this.counter += 1;
  // } else if (this.counter == MAX_SEATS) {
  } else if (this.counter == this.showStorage.passengersNumber ) {
    alert(`You have reached maximum selection of seats for ${this.showStorage.passengersNumber} passengers`)
  }
  localStorage.setItem("chosenSeats", JSON.stringify(this.seatsList));
  }
  saveData() {
    this.existingData = this.existingData ? JSON.parse(this.existingData) : {};
    this.existingData["chosenPlane"] = this.chosenPlane;
    localStorage.setItem("flightdetails", JSON.stringify(this.existingData))
  }
}
