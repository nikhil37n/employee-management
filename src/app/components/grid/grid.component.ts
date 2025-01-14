import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory } from 'src/app/inventory/inventory';
import { Employee } from 'src/app/inventory/user';
import { AddEditReporteeComponent } from './add-edit-reportee/add-edit-reportee.component';
import { ChangeReportingLineComponent } from './change-reporting-line/change-reporting-line.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { Store } from '@ngrx/store';
import {
  addemployee,
  changereporting,
  deleteemployee,
  loademployee,
  updateemployee,
} from 'src/app/store/Employee.Action';
import { getemployeelist } from 'src/app/store/Employee.Selector';
import {
  ClarityIcons,
  addTextIcon,
  banIcon,
  pencilIcon,
  switchIcon,
} from '@cds/core/icon';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @ViewChild('addReportee')
  addReporteeComponent!: AddEditReporteeComponent;
  @ViewChild('editEmployee')
  editEmployeeComponent!: AddEditReporteeComponent;
  @ViewChild('changeReportingLine')
  changeReportingLineComponent!: ChangeReportingLineComponent;
  @ViewChild('deleteEmployee')
  deleteEmployeeComponent!: DeleteEmployeeComponent;
  public employees!: Employee[];
  public selected: Employee[] | undefined;
  public designations: string[] = [];
  public managers: string[] = [];
  public toEdit: Employee | undefined;
  public isAddModalOpen = false;
  public isEditModalOpen = false;
  public isChangeReportingModalOpen = false;
  public isDeleteModalOpen = false;
  public isValid = false;
  public options = {
    totalEmployees: 20,
    pageSize: '10',
    selectable: true,
  };
  public currentPageSize = +this.options.pageSize;
  private generatedNumber: number | null = null;
  private uniqueNumbers: Set<number> = new Set();
  private employee: Employee | undefined;

  constructor(private inventory: Inventory, private store: Store) {
    this.reset();
  }

  ngOnInit() {
    ClarityIcons.addIcons(addTextIcon, pencilIcon, banIcon, switchIcon);
    this.loadEmployees();
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

  reset() {
    setTimeout(() => {
      this.inventory.size = this.options.totalEmployees;
      this.currentPageSize = Number.parseInt(this.options.pageSize, 10);
      this.selected = this.options.selectable ? [] : undefined;
    });
  }

  trackEmployeeItemById(employee: Employee) {
    return employee.empId;
  }

  onAdd(employee: Employee) {
    this.employee = employee;
    this.isAddModalOpen = true;
    this.addReporteeComponent?.addEditReporteeForm?.controls[
      'manager'
    ].setValue(employee.empName);
  }

  onEdit(employee: Employee) {
    this.employee = employee;
    this.isEditModalOpen = true;
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'manager'
    ].setValue(employee.manager);
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'empName'
    ].setValue(employee.empName);
    this.editEmployeeComponent?.addEditReporteeForm?.controls[
      'designation'
    ].setValue(employee.designation);
    this.editEmployeeComponent?.addEditReporteeForm?.controls['email'].setValue(
      employee.email
    );
    this.editEmployeeComponent?.addEditReporteeForm?.controls['phone'].setValue(
      employee.phone
    );
  }

  onDelete(employee: Employee) {
    this.employee = employee;
    this.isDeleteModalOpen = true;
    this.deleteEmployeeComponent?.deleteEmployeeForm?.controls[
      'empName'
    ].setValue(employee.empName);
  }

  onChangeReporting(employee: Employee) {
    this.isChangeReportingModalOpen = true;
    this.changeReportingLineComponent?.changeReportingLineForm?.controls[
      'empName'
    ].setValue(employee.empName);
  }

  isFormValid(valid: boolean) {
    this.isValid = valid;
  }

  handleOnAddReportee() {
    let form = this.addReporteeComponent?.addEditReporteeForm;
    if (form?.valid) {
      const _obj: Employee = {
        manager: form.value.manager + ' (' + this.employee?.empId + ')',
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
        empId: this.employee?.empId || -1,
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
