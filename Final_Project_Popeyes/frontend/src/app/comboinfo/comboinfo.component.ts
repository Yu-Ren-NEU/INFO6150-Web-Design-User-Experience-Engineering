import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http'; //import HTML service

@Component({
  selector: 'app-comboinfo',
  templateUrl: './comboinfo.component.html',

  styleUrls: ['./comboinfo.component.scss', './vendor/bootstrap/bootstrap.min.css', './vendor/select2/select2.min.css',
    './vendor/owlcarousel/owl.carousel.min.css', './vendor/lightcase/lightcase.css', './css/aos.css', './css/fonts-googleapis.css', './css/style.min.css',
    './css/icon-font.min.css', './css/all.css']

})
export class ComboinfoComponent implements OnInit {

  // Parameters to store the combo info.
  public key: any;
  public combolist: any[] = [];
  public item: any;
  public comments: string[] = [];

  // Parameters to store the user info.
  public username: string;
  public usermail: string;

  // The parameter for new comment.
  public comment: string;

  constructor(public route: ActivatedRoute, public http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((response) => {
      // Get the comboid from route.
      console.log(response);
      // tslint:disable-next-line:radix
      this.key = parseInt(response.comboid);
      let api = 'http://localhost:3000/combos';

      // Send http to get the information about this combo.
      this.http.get(api).subscribe((response: any) => {
        console.log(response);
        this.combolist = response;
        // console.log(this.combolist);
        this.item = this.combolist[this.key];
        // console.log(this.item);
        this.comments = this.item.Comments;
        console.log(this.comments);
      });
    });

    this.usermail = localStorage.getItem("usermail");
    this.username = localStorage.getItem("username");
  }

  editcombo(): void {
    // Back to the top of window.
    window.scrollTo(0, 0);
    // To edit page.
    this.router.navigate(['/newcombo', this.item.id]);
  }

  deletecombo(): void {
    let api = 'http://localhost:3000/combos/' + this.item.id;
    this.http.delete(api).subscribe((response) => {
      // console.log(response);
      // Back to the top of window.
      window.scrollTo(0, 0);
      // To user page.
      this.router.navigate(['/userinfo']);
    });
  }

  sendcomment(): void {
    // If comment is empty. Error!
    if (this.comment === "") {
      alert("Comment is empty");
      return;
    }
    // Using '/' to split the comment content and username.
    this.comments[this.comments.length] = this.comment + "/" + this.username;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let api = 'http://localhost:3000/combos/' + this.item.id;
    // Update the comments in combo.
    this.http.put(api, {
      'Comments': this.comments
    }, httpOptions).subscribe((response) => {
      this.comment = "";
      console.log(response);
    });
  }

}
