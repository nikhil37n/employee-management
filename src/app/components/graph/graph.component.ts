import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/inventory/user';
import { loademployee } from 'src/app/store/Employee.Action';
import { getemployeelist } from 'src/app/store/Employee.Selector';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  public employees!: Employee[];
  public data: Employee[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.store.dispatch(loademployee());
    this.store.select(getemployeelist).subscribe((item) => {
      setTimeout(() => {
        this.employees = item;
      }, 0);
    });
  }
}
