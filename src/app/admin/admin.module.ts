import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AddPageComponent } from './add-page/add-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';


@NgModule({
  declarations: [
    AdminLayoutComponent, 
    LoginPageComponent, 
    AddPageComponent, 
    DashboardPageComponent, 
    EditPageComponent, 
    OrdersPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
