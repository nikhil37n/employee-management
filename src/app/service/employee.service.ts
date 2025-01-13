import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Employee } from 'src/app/inventory/user';
import { BannerService } from './banner.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private storageKey = 'employee_list';
  constructor(private http: HttpClient, private bannerService: BannerService) {}

  GetAll() {
    let existingEntries = this.getExistingEntriesFromStorage();
    // If entries available in storage get it from session otherwise make a call
    if (existingEntries.length) {
      const data = [...existingEntries];
      return of(data);
    } else {
      return this.http.get<Employee[]>('/assets/data.json');
    }
  }

  Create(data: Employee) {
    let existingEntries = this.getExistingEntriesFromStorage();
    // Update existing data with newly added reportee
    if (!existingEntries.includes(data)) {
      existingEntries.push(data);
      localStorage.setItem(this.storageKey, JSON.stringify(existingEntries));
    } else {
      this.bannerService.showBanner(data + ' already exists', 'warning');
    }
    return of();
  }

  Update(inputdata: Employee) {
    let existingEntries = this.getExistingEntriesFromStorage();
    const empIndex = existingEntries.findIndex(
      (emp: Employee) => emp.empId === inputdata.empId
    );
    // Update repotees manager name if updated
    if (existingEntries[empIndex].empName !== inputdata.empName) {
      const reportees = existingEntries
        .filter((e: Employee) => e.manager.includes(inputdata.empId as any))
        .map((emp: Employee) => {
          emp.manager = inputdata.empName + ' (' + inputdata.empId + ')';
          return emp;
        });
    }
    // Update existing entries in storage
    existingEntries = existingEntries.map((e: Employee, index: number) =>
      index === empIndex ? inputdata : e
    );
    // Update storage
    this.updateStorageData(existingEntries);
    return of();
  }

  UpdateReportingLine(inputdata: Employee) {
    let existingEntries = this.getExistingEntriesFromStorage();
    const empIndex = existingEntries.findIndex(
      (emp: Employee) => emp.empName === inputdata.empName
    );
    let selectedEmployee = existingEntries[empIndex];
    // Update new manager in selected employee
    if (selectedEmployee) {
      selectedEmployee = { ...selectedEmployee, manager: inputdata.manager };
    }
    // Update existing entries in storage
    existingEntries = existingEntries.map((e: Employee, index: number) =>
      index === empIndex ? selectedEmployee : e
    );
    // Update storage
    this.updateStorageData(existingEntries);
    return of();
  }

  Delete(code: number, manager: string, parentManager: string) {
    let existingEntries = this.getExistingEntriesFromStorage();
    // Check and update reportees's manager to parent before deleting current employee
    const reportees = existingEntries
      .filter((e: Employee) => e.manager === manager)
      .map((emp: Employee) => {
        emp.manager = parentManager;
        return emp;
      });
    // Delete from storage
    existingEntries.splice(
      existingEntries.findIndex((e: Employee) => e.empId === code),
      1
    );
    // Update storage
    this.updateStorageData(existingEntries);
    return of();
  }

  getExistingEntriesFromStorage() {
    const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return data;
  }

  updateStorageData(existingEntries: Employee) {
    localStorage.removeItem(this.storageKey);
    localStorage.setItem(this.storageKey, JSON.stringify(existingEntries));
  }
}
