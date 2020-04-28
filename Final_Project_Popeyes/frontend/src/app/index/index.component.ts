import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', './vendor/bootstrap/bootstrap.min.css', './vendor/select2/select2.min.css',
    './vendor/owlcarousel/owl.carousel.min.css', './vendor/lightcase/lightcase.css', './css/aos.css', './css/fonts-googleapis.css', './css/style.min.css',
    './css/icon-font.min.css', './css/all.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) {
  }

  // There is just page jump in this page.
  ngOnInit(): void {
  }

  JumpToNewCombo(): void {
    // Back to the top if window.
    window.scrollTo(0, 0);
    // Jump to new combo page.
    this.router.navigate(['/newcombo'])
  }
}
