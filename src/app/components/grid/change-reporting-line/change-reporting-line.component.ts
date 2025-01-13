import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/inventory/user';

@Component({
  selector: 'app-change-reporting-line',
  templateUrl: './change-reporting-line.component.html',
  styleUrls: ['./change-reporting-line.component.css'],
})
export class ChangeReportingLineComponent implements OnInit {
  @Input() managers!: string[];
  @Output() isFormValid = new EventEmitter();
  public changeReportingLineForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.changeReportingLineForm = this.fb.group({
      empName: [''],
      manager: ['', Validators.required],
    });
    this.changeReportingLineForm.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.changeReportingLineForm?.valid);
    });
  }
}
