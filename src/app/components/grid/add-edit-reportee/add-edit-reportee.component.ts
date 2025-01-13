import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Employee } from 'src/app/inventory/user';

@Component({
  selector: 'app-add-edit-reportee',
  templateUrl: './add-edit-reportee.component.html',
  styleUrls: ['./add-edit-reportee.component.css'],
})
export class AddEditReporteeComponent implements OnInit {
  @Input() designations!: string[];
  @Input() managers!: string[];
  @Input() isEdit = false;
  @Output() isFormValid = new EventEmitter();
  public addEditReporteeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addEditReporteeForm = this.fb.group({
      manager: ['', Validators.required],
      empName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneNumberValidator()]],
    });
    this.addEditReporteeForm.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.addEditReporteeForm?.valid);
    });
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^\d{10}$/.test(phoneNumber); // Regex for 10 digits
      return isValid ? null : { invalidPhoneNumber: true };
    };
  }
}
