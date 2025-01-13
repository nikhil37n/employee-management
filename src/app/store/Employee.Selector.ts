import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModel } from 'src/app/inventory/user';

const getemployeestate = createFeatureSelector<EmployeeModel>('employee');

export const getemployeelist = createSelector(getemployeestate, (state) => {
  return state?.list;
});

export const getemployee = createSelector(getemployeestate, (state) => {
  return state?.employeeobj;
});
