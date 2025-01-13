import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  public data = [];

  ngOnInit() {
    d3.csv('/assets/convertcsv.csv').then((data: any) => {
      this.data = data;
    });
  }
}
