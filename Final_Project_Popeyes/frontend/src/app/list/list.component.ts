import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http'; //import HTML service

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', './vendor/bootstrap/bootstrap.min.css', './vendor/select2/select2.min.css',
    './vendor/owlcarousel/owl.carousel.min.css', './vendor/lightcase/lightcase.css', './css/aos.css', './css/fonts-googleapis.css', './css/style.min.css',
    './css/icon-font.min.css', './css/all.css']
})
export class ListComponent implements OnInit {

  public combolist: any[] = [];   // define an array to store combolist

  constructor(private router: Router, public http: HttpClient) {
  }

  ngOnInit(): void {
    let api = 'http://localhost:3000/combos';

    // Get combo list.
    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      this.combolist = response;
    });
  }

  JumpToNewCombo(): void {
    // Back to the top of window
    window.scrollTo(0, 0);
    // Jump to the new combo page.
    this.router.navigate(['/newcombo']);
  }

  JumpToComboInfo(comboid): void {
    // Back to the top of window
    window.scrollTo(0, 0);
    // Jump to the combo detail page.
    this.router.navigate((['/comboinfo', comboid]));
  }
}
