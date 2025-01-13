import { Component, OnInit, ViewChild } from '@angular/core';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  internetOfThingsIcon,
  usersIcon,
  gridViewIcon,
} from '@cds/core/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Employee Management';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/']);
    ClarityIcons.addIcons(internetOfThingsIcon, usersIcon, gridViewIcon);
  }

  goToGraphView() {
    this.router.navigate(['/graph']);
  }

  goToGridView() {
    this.router.navigate(['/grid']);
  }
}
