import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrDatagridModule,
  ClrFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrLoadingModule,
  ClrRadioModule,
  ClrSelectModule,
} from '@clr/angular';
import { CdsIconModule, CdsModule } from '@cds/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Inventory } from './inventory/inventory';
import { GraphComponent } from './components/graph/graph.component';
import { AddEditReporteeComponent } from './components/grid/add-edit-reportee/add-edit-reportee.component';
import { DeleteEmployeeComponent } from './components/grid/delete-employee/delete-employee.component';
import { ChangeReportingLineComponent } from './components/grid/change-reporting-line/change-reporting-line.component';
import { GridComponent } from './components/grid/grid.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmployeeReducer } from './store/Employee.Reducer';
import { EmployeeEffects } from './store/Employee.Effects';
import { BannerComponent } from './components/banner/banner/banner.component';
import { D3OrgChartComponent } from './components/d3-org-chart/d3-org-chart.component';
import { BannerService } from './service/banner.service';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    GridComponent,
    AddEditReporteeComponent,
    DeleteEmployeeComponent,
    ChangeReportingLineComponent,
    BannerComponent,
    D3OrgChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    CdsModule,
    CdsIconModule,
    CommonModule,
    ClrDatagridModule,
    ClrRadioModule,
    ClrCheckboxModule,
    ClrFormsModule,
    ClrLoadingModule,
    ClrIconModule,
    ClrInputModule,
    ClrSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ employee: EmployeeReducer }),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
  ],
  providers: [Inventory, BannerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
