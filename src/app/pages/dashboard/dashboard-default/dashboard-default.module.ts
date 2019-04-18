import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDefaultComponent } from './dashboard-default.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export const DashboardDefaultRoutes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardDefaultRoutes),
    SharedModule,
    ChartModule,
    ModalModule.forRoot()
  ],
  declarations: [DashboardDefaultComponent],
})
export class DashboardDefaultModule { }
