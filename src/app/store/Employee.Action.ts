import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/inventory/user';

export const LOAD_EMPLOYEE = '[employee list page]load employee';
export const LOAD_EMPLOYEE_SUCCESS =
  '[employee list page]load employee success';
export const LOAD_EMPLOYEE_FAIL = '[employee list page]load employee fail';

export const ADD_EMPLOYEE = '[add-edit employee page]add employee';
export const ADD_EMPLOYEE_SUCCESS =
  '[add-edit employee page]add employee success';
export const ADD_EMPLOYEE_FAIL = '[add-edit employee page]add employee fail';

export const CHANGE_REPORTING = '[change-reporting-line page]change reporting';
export const CHANGE_REPORTING_SUCCESS =
  '[change-reporting-line page]change reporting success';
export const CHANGE_REPORTING_FAIL =
  '[change-reporting-line page]change reporting fail';

export const DELETE_EMPLOYEE = '[delete employee page]delete employee';
export const DELETE_EMPLOYEE_SUCCESS =
  '[delete employee page]delete employee success';
export const DELETE_EMPLOYEE_FAIL =
  '[delete employee page]delete employee fail';

export const UPDATE_EMPLOYEE = '[edit employee page]update employee';
export const UPDATE_EMPLOYEE_SUCCESS =
  '[edit employee page]update employee success';
export const UPDATE_EMPLOYEE_FAIL = '[edit employee page]update employee fail';

// Load Employee
export const loademployee = createAction(LOAD_EMPLOYEE);
export const loademployeesuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list: Employee[] }>()
);
export const loademployeefail = createAction(
  LOAD_EMPLOYEE_FAIL,
  props<{ errormessage: string }>()
);

// Add Employee
export const addemployee = createAction(
  ADD_EMPLOYEE,
  props<{ inputdata: Employee }>()
);
export const addemployeesuccess = createAction(
  ADD_EMPLOYEE_SUCCESS,
  props<{ inputdata: Employee }>()
);
export const addemployeefail = createAction(
  ADD_EMPLOYEE_FAIL,
  props<{ errormessage: string }>()
);

// UPDATE EMPLOYEE
export const updateemployee = createAction(
  UPDATE_EMPLOYEE,
  props<{ inputdata: Employee }>()
);
export const updateemployeesuccess = createAction(
  UPDATE_EMPLOYEE_SUCCESS,
  props<{ inputdata: Employee }>()
);
export const updateemployeefail = createAction(
  UPDATE_EMPLOYEE_FAIL,
  props<{ errormessage: string }>()
);

// Change Reporting Line
export const changereporting = createAction(
  CHANGE_REPORTING,
  props<{ inputdata: Employee }>()
);
export const changereportingsuccess = createAction(
  CHANGE_REPORTING_SUCCESS,
  props<{ inputdata: Employee }>()
);
export const changereportingfail = createAction(
  CHANGE_REPORTING_FAIL,
  props<{ errormessage: string }>()
);

// Delete Employee
export const deleteemployee = createAction(
  DELETE_EMPLOYEE,
  props<{ code: number; manager: string; parentManager: string }>()
);
export const deleteemployeesuccess = createAction(
  DELETE_EMPLOYEE_SUCCESS,
  props<{ code: number }>()
);
export const deleteemployeefail = createAction(
  DELETE_EMPLOYEE_FAIL,
  props<{ errormessage: string }>()
);
