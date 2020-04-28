import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss', './vendor/bootstrap/bootstrap.min.css', './vendor/select2/select2.min.css',
    './vendor/owlcarousel/owl.carousel.min.css', './vendor/lightcase/lightcase.css', './css/aos.css', './css/fonts-googleapis.css', './css/style.min.css',
    './css/icon-font.min.css', './css/all.css']

})
export class LoginComponent implements OnInit {

  // Login information
  public loginmail: string;
  public loginpassword: string;
  public user: object;

  // New user's information
  public username: string;
  public mail: string;
  public phone: string;
  public password: string;

  constructor(public http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    // Set empty.
    this.loginmail = "";
    this.loginpassword = "";

    this.username = "";
    this.mail = "";
    this.phone = "";
    this.password = "";
  }

  userlogin(): void {
    if (this.loginmail === "") {
      alert("The mail cannot be empty");
      return;
    }
    let api = 'http://localhost:3000/users/' + this.loginmail;
    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      // No relative user
      if (response === null) {
        alert("No such user! Please create an account.");
        return;
      }
      this.user = response;
      // If there is such user. Store the information to localstorage.
      // @ts-ignore
      if (this.user.Password === this.loginpassword) {
        // @ts-ignore
        localStorage.setItem("usermail", this.user.Mail);
        // @ts-ignore
        localStorage.setItem("username", this.user.Username);
        window.scrollTo(0, 0);
        this.router.navigate(['/index']);
      } else {
        alert("The password is wrong!");
      }
    });
  }

  addnewuser(): void {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    let api = 'http://localhost:3000/users/' + this.mail;
    this.http.get(api).subscribe((response) => {
      if (response === null) {
        api = 'http://localhost:3000/users';
        this.http.post(api, {
          'Username': this.username,
          'Mail': this.mail,
          'Phone': this.phone,
          'Password': this.password
        }, httpOptions).subscribe((response) => {
          console.log(response);
          // alert('Added Successfully!');
          window.scrollTo(0, 0);
          this.ngOnInit();
          alert("Sign up successful!");
        });
      } else {
        alert("Please use different email!");
      }
    });


  }

}

