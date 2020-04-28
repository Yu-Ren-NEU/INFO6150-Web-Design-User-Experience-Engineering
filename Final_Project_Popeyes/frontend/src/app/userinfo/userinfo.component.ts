import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',

  styleUrls: ['./userinfo.component.scss', './vendor/bootstrap/bootstrap.min.css', './vendor/select2/select2.min.css',
    './vendor/owlcarousel/owl.carousel.min.css', './vendor/lightcase/lightcase.css', './css/aos.css', './css/fonts-googleapis.css', './css/style.min.css',
    './css/icon-font.min.css', './css/all.css']

})
export class UserinfoComponent implements OnInit {

  // Parameters for user information
  public usermail: string;
  public user: object;
  public username: string;
  public userphone: string;

  // Combos list
  public combolist: any[] = [];

  constructor(public http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("usermail") === null) {
      // alert("Please Sign in at first!");
      this.router.navigate(["/login"]);
      return;
    }
    this.usermail = localStorage.getItem("usermail");
    let api = 'http://localhost:3000/users/' + this.usermail;

    // Get user information.
    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      this.user = response;
      // @ts-ignore
      this.username = this.user.Username;
      // @ts-ignore
      this.userphone = this.user.Phone;
    });

    api = 'http://localhost:3000/combos';

    // Get combo list.
    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      this.combolist = response;
    });
  }

  logout(): void {
    localStorage.clear();
    window.scrollTo(0, 0);
    this.router.navigate(['/index'])
  }

  JumpToComboInfo(comboid): void {
    window.scrollTo(0, 0);
    this.router.navigate((['/comboinfo', comboid]));
  }
}
