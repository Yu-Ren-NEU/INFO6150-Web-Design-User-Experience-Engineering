import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http'; //import HTML service

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public todolist: any[] = [];   // define an array to store todolist

  constructor(public http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    let api = 'http://localhost:3000/todos';

    this.http.get(api).subscribe((response: any) => {
      console.log(response);
      this.todolist = response;
    });

  }

  checkboxChange(key) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let id = this.todolist[key].id;
    let api = 'http://localhost:3000/todos/' + id;
    console.log(api);
    this.http.put(api, {
      // 'title': this.todolist[key].title,
      // 'description': this.todolist[key].description,
      'isCompleted': this.todolist[key].isCompleted,
      // 'due': this.todolist[key].due
    }, httpOptions).subscribe((response) => {
      console.log(response);
    });
  }

  goDetail(key) {
    this.router.navigate(['/todos/edit', key]);
  }

  addNew() {
    this.router.navigate(['/todos/new']);
  }

  delete(key) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let id = this.todolist[key].id;
    let api = 'http://localhost:3000/todos/' + id;
    this.http.delete(api).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    });
  }

}
