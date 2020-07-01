import { Component, OnInit } from '@angular/core';
import { TimeoutService } from '../timeout.service';

const MAX_SEATS = 9;

@Component({
  selector: 'app-bombardier',
  templateUrl: './bombardier.component.html',
  styleUrls: ['./bombardier.component.scss']
})
export class BombardierComponent implements OnInit {

  constructor(private timeoutService: TimeoutService) {
    this.showStorage = localStorage.getItem("flightdetails") || {};
  }
  public fancyButton={
    backgroundColor: "#FDB729",
    border: "3px solid white",
    borderRadius: "10px",
    textAlign: "center",
    height: "40px",
    width: "200px",
    textTransform: "uppercase",
    fontWeight: "bold",
  }

  public showStorage: any;

  ngOnInit() {
    this.timeoutService.resetTimer();
  }

  counter = 0;
  public chosenSeat: any;
  public seatsList = [];

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
  } else if (this.counter < MAX_SEATS) {
      seat.removeAttribute("style");
      seat.setAttribute("class", "occupied st14");
      this.seatsList.push(this.chosenSeat)
      this.counter += 1;
  } else if (this.counter == MAX_SEATS) {
    alert("You have reached maximum selection of seats.")
  }
  }
}
