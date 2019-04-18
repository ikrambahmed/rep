import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export const ButtonRoutes: Routes = [
  {
    path: '',
    component: ButtonComponent,
    data: {
      breadcrumb: 'Button',
      icon: 'icofont-layout bg-c-blue',
      status: true
    }
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ButtonRoutes),
    SharedModule,
    ReactiveFormsModule ,
    FormsModule , 
    ReactiveFormsModule , 
    HttpClientModule ,
    ],
  declarations: [ButtonComponent]
})
export class ButtonModule { }
