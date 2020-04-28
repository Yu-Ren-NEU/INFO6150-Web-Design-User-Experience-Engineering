import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// router or url of the component
@Component({
  selector: 'app-newcombo',
  templateUrl: './newcombo.component.html',
  styleUrls: ['./newcombo.component.scss', './css/bootstrap.min.css', './css/animate.css', './css/icomoon.css', './css/themify-icons.css',
    './css/bootstrap.css', './css/magnific-popup.css', './css/bootstrap-datetimepicker.min.css', './css/owl.carousel.min.css',
    './css/owl.theme.default.min.css', './css/style.css']
})
export class NewcomboComponent implements OnInit {

  public usermail: string;
  public username: string;

  // parameter to store the name of main dish and display on the following form
  public mainmenu1: string;
  public side: string;
  public sauce: string;
  public drink: string;
  public title: string;
  public description: string;
  public label: string;
  public combo: object;

  // if it's combo edit
  public comboid: string;

  // For jump in the page
  public routeid: string;

  constructor(public route: ActivatedRoute, public http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    // Get user information from the localStorage. If there is no user. Need to login.
    if (localStorage.getItem("usermail") === null) {
      // alert("Please Sign in at first!");
      this.router.navigate(["/login"]);
      return;
    }
    this.usermail = localStorage.getItem("usermail");
    this.username = localStorage.getItem("username");

    // Initialize the parameters.
    // this.comboid = "";
    this.combo = null;
    this.mainmenu1 = "Fresh Steak";
    this.side = "Wing";
    this.sauce = "Ketchup";
    this.drink = "Coffee";
    this.label = "Healthy";
    this.title = "";
    this.description = "";
    this.routeid = "";

    console.log(this.route);

    this.route.params.subscribe((response) => {
      // console.log(response);
      // tslint:disable-next-line:radix
      this.comboid = response.comboid;
      // If it is not editing. Set empty.
      if (this.comboid === undefined) {
        this.comboid = "";
        this.routeid = "";
        return;
      }
      let api = 'http://localhost:3000/combos/' + this.comboid;

      // Get the information if there is editing operation.
      this.http.get(api).subscribe((response: any) => {
        // console.log(response);
        this.combo = response;
        // @ts-ignore
        this.mainmenu1 = this.combo.Main;
        // @ts-ignore
        this.side = this.combo.Side;
        // @ts-ignore
        this.sauce = this.combo.Sauce;
        // @ts-ignore
        this.drink = this.combo.Drink;
        // @ts-ignore
        this.label = this.combo.Label;
        // @ts-ignore
        this.title = this.combo.Title;
        // @ts-ignore
        this.description = this.combo.Description;
        this.routeid = "/" + this.comboid;
      });
    });
  }

  // Change the value of main
  changeMain(Main): void {
    this.mainmenu1 = Main;
  }

  // Change the value of side
  changeSide(Side): void {
    this.side = Side;
  }

  // Change the value of sauce
  changeSauce(Sauce): void {
    this.sauce = Sauce;
  }

  // Change the value of drink
  changeDrink(Drink): void {
    this.drink = Drink;
  }

  // Change the value of label
  changeLabel(Label): void {
    this.label = Label;
  }

  createnewcombo(): void {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    let api = 'http://localhost:3000/combos';
    // Add new combo to the server.
    this.http.post(api, {
      'Title': this.title,
      'Description': this.description,
      'Main': this.mainmenu1,
      'Side': this.side,
      'Sauce': this.sauce,
      'Drink': this.drink,
      'Label': this.label,
      'Owner': this.username,
      'Ownermail': this.usermail
    }, httpOptions).subscribe((response) => {
      console.log(response);
      // alert('Added Successfully!');
      window.scrollTo(0, 0);
      this.combo = response;
      // @ts-ignore
      this.router.navigate(['userinfo']);
    });
  }

  editcombo(): void {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    // Update the information of this combo.
    let api = 'http://localhost:3000/combos/' + this.comboid;
    this.http.put(api, {
      'Title': this.title,
      'Description': this.description,
      'Main': this.mainmenu1,
      'Side': this.side,
      'Sauce': this.sauce,
      'Drink': this.drink,
      'Label': this.label,
      'Owner': this.username,
      'Ownermail': this.usermail
    }, httpOptions).subscribe((response) => {
      console.log(response);
      // alert('Added Successfully!');
      window.scrollTo(0, 0);
      this.combo = response;
      // @ts-ignore
      // Success and jump to user's profile.
      this.router.navigate(['userinfo']);
    });
  }

}
