import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './components/graph/graph.component';
import { GridComponent } from './components/grid/grid.component';
import { AddEditReporteeComponent } from './components/grid/add-edit-reportee/add-edit-reportee.component';
import { ChangeReportingLineComponent } from './components/grid/change-reporting-line/change-reporting-line.component';
import { DeleteEmployeeComponent } from './components/grid/delete-employee/delete-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/graph', pathMatch: 'full' },
  { path: 'graph', component: GraphComponent },
  {
    path: 'grid',
    component: GridComponent,
    children: [
      { path: 'add-edit-reportee', component: AddEditReporteeComponent },
      {
        path: 'change-reporting-line',
        component: ChangeReportingLineComponent,
      },
      { path: 'delete-employee', component: DeleteEmployeeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
