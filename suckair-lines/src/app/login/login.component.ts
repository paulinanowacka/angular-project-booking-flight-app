import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { users } from './users';
import { TimeoutService } from '../timeout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [TimeoutService]
})
export class LoginComponent implements OnInit {

  public fancy={
    backgroundColor: "#FEEDCC",
    border: "3px solid white",
    borderRadius: "10px",
    textAlign: "center",
    height: "40px"
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

  public comUser = ''

  constructor(private router: Router,private timeoutService: TimeoutService) {
    this.showStorage = JSON.parse(localStorage.getItem("flightdetails")) || {};
  }

  public showStorage: any;

  ngOnInit() {
    this.timeoutService.resetTimer();
  }

  log(email,password){
    console.log(email.value.toLowerCase())
    console.log(password.value)

    const matchingUser = users.filter(user => {
      return user.email === email.value.toLowerCase()
    })

    if (matchingUser) {
      console.log("istnieje uzytkownik");
      // alert("Everythings good, you will be redirected in a minute. If something went wrong, please refresh webpage")
       if ((this.showStorage.departureAirport == "Warsaw" && this.showStorage.arrivalAirport == "Paris") || (this.showStorage.departureAirport == "Paris" && this.showStorage.arrivalAirport == "Warsaw")) {
          this.router.navigate(['/bombardier']);
        }

        else if ((this.showStorage.departureAirport == "Warsaw" && this.showStorage.arrivalAirport == "New York") || (this.showStorage.departureAirport == "New York" && this.showStorage.arrivalAirport == "Warsaw")) {
          this.router.navigate(['/boeing787']);
        }

        else if ((this.showStorage.departureAirport == "Paris" && this.showStorage.arrivalAirport == "New York") || (this.showStorage.departureAirport == "New York" && this.showStorage.arrivalAirport == "Paris")) {
          this.router.navigate(['/boeing737']);
        } else {
          this.router.navigate(['/flightdetails']);
        }
    } else {
      alert("Failed to log in. Incorrect data or user doesn't exist")
    }
  }
}
