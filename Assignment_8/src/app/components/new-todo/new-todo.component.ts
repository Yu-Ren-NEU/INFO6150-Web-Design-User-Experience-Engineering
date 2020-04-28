import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  public isCompleted: boolean;
  public title: string;
  public description: string;
  public due: Date;

  constructor(public http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  add() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    let api = 'http://localhost:3000/todos';
    this.http.post(api, {
      'isCompleted': false,
      'title': this.title,
      'description': this.description,
      'due': this.due
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('Added Successfully!');
    });
  }

  back() {
    this.router.navigate(['/todos']);
  }

}
