import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  public deleteEmployeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.deleteEmployeeForm = this.fb.group({
      empName: [''],
    });
  }
}
