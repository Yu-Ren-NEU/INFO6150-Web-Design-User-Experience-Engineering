import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http'; // import HTML service

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  public key: any;
  public todolist: any[] = [];
  public item: any;

  constructor(public route: ActivatedRoute, public http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((response) => {
      console.log(response);
      // tslint:disable-next-line:radix
      this.key = parseInt(response.todoid);
      let api = 'http://localhost:3000/todos';

      this.http.get(api).subscribe((response: any) => {
        console.log(response);
        this.todolist = response;
        console.log(this.todolist);
        this.item = this.todolist[this.key];
        console.log(this.item);
      });
    });


  }

  update() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let id = this.item.id;
    var api = 'http://localhost:3000/todos/' + id;
    this.http.put(api, {
      'title': this.item.title,
      'description': this.item.description,
      'isCompleted': this.item.isCompleted,
      'due': this.item.due
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('Updated Successfully!');
    });
  }

  back() {
    this.router.navigate(['/todos']);
  }

}
