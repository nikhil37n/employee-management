import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, of, map, switchMap } from 'rxjs';
import {
  addemployee,
  addemployeefail,
  addemployeesuccess,
  changereporting,
  changereportingfail,
  changereportingsuccess,
  deleteemployee,
  deleteemployeefail,
  deleteemployeesuccess,
  loademployee,
  loademployeefail,
  loademployeesuccess,
  updateemployee,
  updateemployeefail,
  updateemployeesuccess,
} from './Employee.Action';
import { EmployeeService } from '../service/employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(private actin$: Actions, private service: EmployeeService) {}

  _loademployee = createEffect(() =>
    this.actin$.pipe(
      ofType(loademployee),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            var existingEntries = JSON.parse(
              localStorage.getItem('employee_list') || '[]'
            );

            if (!existingEntries.includes(data)) {
              localStorage.setItem('employee_list', JSON.stringify(data));
            }

            return loademployeesuccess({ list: data });
          }),
          catchError((_error) =>
            of(loademployeefail({ errormessage: _error.message }))
          )
        );
      })
    )
  );

  _addreportee = createEffect(() =>
    this.actin$.pipe(
      ofType(addemployee),
      switchMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          switchMap((data) => {
            return of(addemployeesuccess({ inputdata: action.inputdata }));
          }),
          catchError((_error) => {
            return of(addemployeefail({ errormessage: _error.message }));
          })
        );
      })
    )
  );

  _updateemployee = createEffect(() =>
    this.actin$.pipe(
      ofType(updateemployee),
      switchMap((action) => {
        return this.service.Update(action.inputdata).pipe(
          switchMap((data) => {
            return of(updateemployeesuccess({ inputdata: action.inputdata }));
          }),
          catchError((_error) =>
            of(updateemployeefail({ errormessage: _error.message }))
          )
        );
      })
    )
  );

  _updatereportingline = createEffect(() =>
    this.actin$.pipe(
      ofType(changereporting),
      switchMap((action) => {
        return this.service.UpdateReportingLine(action.inputdata).pipe(
          switchMap((data) => {
            return of(changereportingsuccess({ inputdata: action.inputdata }));
          }),
          catchError((_error) =>
            of(changereportingfail({ errormessage: _error.message }))
          )
        );
      })
    )
  );

  _deleteemployee = createEffect(() =>
    this.actin$.pipe(
      ofType(deleteemployee),
      switchMap((action) => {
        return this.service
          .Delete(action.code, action.manager, action.parentManager)
          .pipe(
            switchMap((data) => {
              return of(deleteemployeesuccess({ code: action.code }));
            }),
            catchError((_error) =>
              of(deleteemployeefail({ errormessage: _error.message }))
            )
          );
      })
    )
  );
}
