import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ClarityIcons, cogIcon } from '@cds/core/icon';
import { OrgChart } from 'd3-org-chart';
import { Employee } from 'src/app/inventory/user';
import { AddEditReporteeComponent } from '../grid/add-edit-reportee/add-edit-reportee.component';
import {
  addemployee,
  changereporting,
  deleteemployee,
  loademployee,
  updateemployee,
} from 'src/app/store/Employee.Action';
import { Store } from '@ngrx/store';
import { getemployeelist } from 'src/app/store/Employee.Selector';
import { ChangeReportingLineComponent } from '../grid/change-reporting-line/change-reporting-line.component';
import { DeleteEmployeeComponent } from '../grid/delete-employee/delete-employee.component';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.css'],
})
export class D3OrgChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') chartContainer: ElementRef | undefined;
  @ViewChild('addReportee')
  addReporteeComponent!: AddEditReporteeComponent;
  @ViewChild('editEmployee')
  editEmployeeComponent!: AddEditReporteeComponent;
  @ViewChild('changeReportingLine')
  changeReportingLineComponent!: ChangeReportingLineComponent;
  @ViewChild('deleteEmployee')
  deleteEmployeeComponent!: DeleteEmployeeComponent;
  @Input() data!: Employee[];
  public chartData: any[] = [];
  public chart: any;
  public openActionsModal = false;
  public isAddModalOpen = false;
  public isEditModalOpen = false;
  public isChangeReportingModalOpen = false;
  public isDeleteModalOpen = false;
  public isValid = false;
  public employees!: Employee[];
  public designations: string[] = [];
  public managers: string[] = [];
  private generatedNumber: number | null = null;
  private uniqueNumbers: Set<number> = new Set();
  public employee: Employee | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    ClarityIcons.addIcons(cogIcon);
    this.loadEmployees();
  }

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

    let chart;
    this.chartData = this.data?.map((element: Employee) => {
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
        manager: element['manager'],
        _directSubordinates: 4,
        _directSubordinatesPaging: 4,
      };
    });

    chart = this.chart
      .container(this.chartContainer?.nativeElement)
      .data(this.chartData)
      .nodeWidth((d: any) => 300)
      .initialZoom(0.7)
      .nodeHeight((d: any) => 200)
      .childrenMargin((d: any) => 40)
      .compactMarginBetween((d: any) => 15)
      .compactMarginPair((d: any) => 80)
      .onNodeClick((d: any) => this.openActions(d))
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
                }" style="margin-top:-33px;margin-left:${d.width / 2 - 75}px;border-radius:100px;width:60px;height:60px;" />

               <div style="margin-left:10px;margin-top:15px;float:left">${
                 d.data.id
               }</div>

               <div style="margin-right:10px;margin-top:15px;float:right" onclick="openActions(${
                 d.data.id
               })"><cds-icon shape="cog"></cds-icon></div>
               
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
  }

  openActions(node: any) {
    this.employee = node.data;
    this.openActionsModal = true;
  }

  isFormValid(valid: boolean) {
    this.isValid = valid;
  }

  loadEmployees() {
    this.store.dispatch(loademployee());
    this.store.select(getemployeelist).subscribe((item) => {
      this.employees = item;
      this.filterAllDesignations(this.employees);
      this.filterAllManagers(this.employees);
    });
  }

  filterAllDesignations(employees: Employee[] = []) {
    this.designations = [...new Set(employees.map((emp) => emp.designation))];
  }

  filterAllManagers(employees: Employee[] = []) {
    this.managers = [...new Set(employees.map((emp) => emp.manager))];
  }

  openAddReporteeModal() {
    this.isAddModalOpen = true;
    this.addReporteeComponent?.addEditReporteeForm?.controls[
      'manager'
    ].setValue(this.employee?.['name']);
  }

  openEditEmployeeModal() {
    this.isEditModalOpen = true;
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'manager'
    ].setValue(this.employee?.manager);
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'empName'
    ].setValue(this.employee?.['name']);
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'designation'
    ].setValue(this.employee?.['positionName']);
    this.editEmployeeComponent?.addEditReporteeForm?.controls['email'].setValue(
      this.employee?.email
    );
    this.editEmployeeComponent?.addEditReporteeForm?.controls['phone'].setValue(
      this.employee?.phone
    );
  }

  openChangeReportingModal() {
    this.isChangeReportingModalOpen = true;
    this.changeReportingLineComponent?.changeReportingLineForm?.controls[
      'empName'
    ].setValue(this.employee?.['name']);
  }

  openDeleteEmployeeModal() {
    this.isDeleteModalOpen = true;
    this.deleteEmployeeComponent?.deleteEmployeeForm?.controls[
      'empName'
    ].setValue(this.employee?.['name']);
  }

  handleOnAddReportee() {
    let form = this.addReporteeComponent?.addEditReporteeForm;
    if (form?.valid) {
      const _obj: Employee = {
        manager: form.value.manager + ' (' + this.employee?.['id'] + ')',
        empId: this.generateUniqueId(),
        empName: form.value.empName,
        designation: form.value.designation,
        email: form.value.email,
        phone: form.value.phone,
      };
      this.store.dispatch(addemployee({ inputdata: _obj }));
    }
    this.isAddModalOpen = false;
    this.onModalClose();
    this.loadEmployees();
  }

  handleOnEditEmployee() {
    let form = this.editEmployeeComponent?.addEditReporteeForm;
    if (form?.valid) {
      const _obj: Employee = {
        manager: form.value.manager,
        empId: this.employee?.['id'] || -1,
        empName: form.value.empName,
        designation: form.value.designation,
        email: form.value.email,
        phone: form.value.phone,
      };
      this.store.dispatch(updateemployee({ inputdata: _obj }));
    }
    this.isEditModalOpen = false;
    this.onModalClose();
    this.loadEmployees();
  }

  handleOnChangeReporting() {
    let form = this.changeReportingLineComponent?.changeReportingLineForm;
    if (form?.valid) {
      const _obj = {
        empName: form.value.empName,
        manager: form.value.manager,
      } as any;
      this.store.dispatch(changereporting({ inputdata: _obj }));
    }
    this.isChangeReportingModalOpen = false;
    this.onModalClose();
    this.loadEmployees();
  }

  handleOnDelete() {
    const empName =
      this.deleteEmployeeComponent?.deleteEmployeeForm?.controls['empName']
        .value;
    const recordToDelete = this.employees.filter(
      (e: Employee) => e.empName === empName
    );
    this.store.dispatch(
      deleteemployee({
        code: recordToDelete[0].empId,
        manager: empName + ' (' + recordToDelete[0].empId + ')',
        parentManager: recordToDelete[0].manager,
      })
    );
    this.isDeleteModalOpen = false;
    this.onModalClose();
    this.loadEmployees();
  }

  onModalClose() {
    this.openActionsModal = false;
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.isChangeReportingModalOpen = false;
    this.isDeleteModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.addReporteeComponent?.addEditReporteeForm?.reset({
      manager: '',
      empName: '',
      designation: '',
      email: '',
      phone: '',
    });
    this.editEmployeeComponent?.addEditReporteeForm?.reset({
      manager: '',
      empName: '',
      designation: '',
      email: '',
      phone: '',
    });
    this.changeReportingLineComponent?.changeReportingLineForm?.reset({
      manager: '',
      empName: '',
    });
    this.deleteEmployeeComponent?.deleteEmployeeForm?.reset({
      empName: '',
    });
  }

  generateUniqueId() {
    let newNumber: number;
    do {
      newNumber = Math.floor(10000 + Math.random() * 90000);
    } while (this.uniqueNumbers.has(newNumber));

    this.uniqueNumbers.add(newNumber);
    this.generatedNumber = newNumber;
    return this.generatedNumber;
  }
}
