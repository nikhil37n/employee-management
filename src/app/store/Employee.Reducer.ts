import { createReducer, on } from '@ngrx/store';
import {
  addemployeefail,
  addemployeesuccess,
  changereportingfail,
  changereportingsuccess,
  deleteemployeefail,
  deleteemployeesuccess,
  loademployeefail,
  loademployeesuccess,
  updateemployeefail,
  updateemployeesuccess,
} from './Employee.Action';
import { EmployeeState } from './Employee.State';

const _EmployeeReducer = createReducer(
  EmployeeState,
  // Load Employee
  on(loademployeesuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errormessage: '',
    };
  }),
  on(loademployeefail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),

  // Add Employee
  on(addemployeesuccess, (state, action) => {
    const _maxid = Math.max(...state.list.map((o) => o.empId));
    const _newdata = { ...action.inputdata };
    _newdata.empId = _maxid + 1;
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: '',
    };
  }),
  on(addemployeefail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),

  // UPDATE EMPLOYEE
  on(updateemployeesuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.empId === action.inputdata.empId ? action.inputdata : o;
    });
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(updateemployeefail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),

  // Change Reporting Line
  on(changereportingsuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.manager === action.inputdata.manager ? action.inputdata : o;
    });
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(changereportingfail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),

  // Delete Employee
  on(deleteemployeesuccess, (state, action) => {
    const _newdata = state.list.filter((o) => o.empId !== action.code);
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(deleteemployeefail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  })
);

export function EmployeeReducer(state: any, action: any) {
  return _EmployeeReducer(state, action);
}
