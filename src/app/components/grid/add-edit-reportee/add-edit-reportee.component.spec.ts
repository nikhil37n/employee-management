import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReporteeComponent } from './add-edit-reportee.component';

describe('AddEditReporteeComponent', () => {
  let component: AddEditReporteeComponent;
  let fixture: ComponentFixture<AddEditReporteeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditReporteeComponent]
    });
    fixture = TestBed.createComponent(AddEditReporteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
