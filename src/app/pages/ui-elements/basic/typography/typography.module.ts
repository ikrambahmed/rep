import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from './typography.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const TypographyRoutes: Routes = [
  {
    path: '',
    component: TypographyComponent,
    data: {
      breadcrumb: 'Typography',
      icon: 'icofont-layout bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TypographyRoutes),
    SharedModule,
    ReactiveFormsModule ,
    FormsModule , 
    ReactiveFormsModule , 
HttpClientModule  ],
  declarations: [TypographyComponent]
})
export class TypographyModule { }
