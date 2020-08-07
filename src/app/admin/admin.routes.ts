import { Routes } from '@angular/router';

import { AuthGuard } from './../shared/auth.guard';

import { AddPageComponent } from './add-page/add-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';


export const adminRoutes: Routes = [
    {
      path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
          {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
          {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
      ]
  }
  ];