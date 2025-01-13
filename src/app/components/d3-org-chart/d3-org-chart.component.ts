import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.css'],
})
export class D3OrgChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') chartContainer: ElementRef | undefined;
  @Input() data: any[] | undefined;
  public chart: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  getManagerCode(input: any) {
    let value;
    const startIndex = input.indexOf('(');
    const endIndex = input.indexOf(')');
    if (startIndex !== -1 && endIndex !== -1) {
      value = input.substring(startIndex + 1, endIndex);
      console.log('Value inside parentheses:', value);
    }
    return value;
  }

  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    // this.chart
    //   .container(this.chartContainer?.nativeElement)
    //   .data(this.data)
    //   .nodeWidth((d: any) => 200)
    //   .nodeHeight((d: any) => 120)
    //   .render();

    // area: 'Corporate';
    // id: 'O-6066';
    // imageUrl: 'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg';
    // isLoggedUser: 'false';
    // name: 'Ian Devling';
    // office: 'CTO office';
    // parentId: '';
    // positionName: 'Chief Executive Officer ';
    // profileUrl: 'http://example.com/employee/profile';
    // size: '';
    // tags: 'Ceo,tag1,manager,cto';
    // _directSubordinates: 4;
    // _directSubordinatesPaging: 4;
    // _pagingStep: 2000;
    // _totalSubordinates: 1515;

    // designation: 'Chief Executive Officer (CEO)';
    // email: 'john.doe@gmail.com';
    // empId: '42654';
    // empName: 'John Doe';
    // manager: '-';
    // phone: '7656765434';

    //  /assets/convertcsv.csv

    var chart;
    d3.csv('/assets/convertcsv.csv').then((dataFlattened: any) => {
      dataFlattened = dataFlattened.map((element: any) => {
        return {
          id: element['empId'],
          imageUrl:
            'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
          name: element['empName'],
          parentId:
            element['manager'] === '-'
              ? ''
              : this.getManagerCode(element['manager']),
          positionName: element['designation'],
          email: element['email'],
          phone: element['phone'],
          _directSubordinates: 4,
          _directSubordinatesPaging: 4,
        };
      });

      chart = this.chart
        .container(this.chartContainer?.nativeElement)
        .data(dataFlattened)
        .nodeWidth((d: any) => 300)
        .initialZoom(0.7)
        .nodeHeight((d: any) => 200)
        .childrenMargin((d: any) => 40)
        .compactMarginBetween((d: any) => 15)
        .compactMarginPair((d: any) => 80)
        .nodeContent(function (d: any, i: any, arr: any, state: any) {
          return `
            <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
              d.height
            }px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height - 32
              }px;padding-top:0px;background-color:hsl(198, 23%, 23%);color: white;border:1px solid lightgray;">

                <img src=" ${
                  d.data.imageUrl
                }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

               <div style="margin-right:10px;margin-top:15px;float:right">${
                 d.data.id
               }</div>
               
               <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
                 d.width - 2
               }px;border-radius:1px"></div>

               <div style="padding:20px; padding-top:35px;text-align:center">
                   <div style="color:white;font-size:16px;font-weight:bold"> ${
                     d.data.name
                   } </div>
                   <div style="color:white;font-size:16px;margin-top:4px"> ${
                     d.data.positionName
                   } </div>
               </div> 
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;margin-bottom: 10px">
                 <div > Email:  ${d.data.email}</div>  
                 <div > Phone: ${d.data.phone}</div>    
               </div>
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                 <div > Manages:  ${d.data._directSubordinates} 👤</div>  
                 <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
               </div>
              </div>     
      </div>
  `;
        })
        .render();
    });
  }
}
