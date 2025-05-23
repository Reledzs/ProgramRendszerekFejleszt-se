import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './shared/services/guards/auth.guard';
import { adminGuard } from './shared/services/guards/admin.guard';
import { CarsComponent } from './cars/cars.component';
import { NgModule } from '@angular/core';
import { CarDetailsComponent } from './car-detail/car-detail.component';
import { ExtraManagerComponent } from './extra-manager/extra-manager.component';
 
export const routes: Routes = [
    {path: 'signup',loadComponent:() => import('./signup/signup.component').then((c)=> c.SignupComponent)},
    {path: 'login',loadComponent:() => import('./login/login.component').then((c)=> c.LoginComponent)},
    {path: 'admin/car-management',loadComponent:() => import('./car-management/car-management.component').then((c)=> c.CarManagementComponent), canActivate:[adminGuard]},
    {path: 'admin/user-management',loadComponent:() => import('./user-management/user-management.component').then((c)=> c.UserManagementComponent), canActivate:[adminGuard]},
    {path: 'admin/booking-management',loadComponent:() => import('./booking-manager/booking-manager.component').then((c)=> c.BookingManagerComponent), canActivate:[adminGuard]},
    {path: 'admin/extra-management',loadComponent:() => import('./extra-manager/extra-manager.component').then((c)=> c.ExtraManagerComponent), canActivate:[adminGuard]},
    {path: 'mybookings',loadComponent:() => import('./booking-user-management/booking-user-management.component').then((c)=> c.BookingUserManagementComponent), canActivate:[authGuard]},
    {path: 'cars',loadComponent:() => import('./cars/cars.component').then((c)=> c.CarsComponent), canActivate:[authGuard]},
    { path: 'cars/:id',loadComponent:() => import('./car-detail/car-detail.component').then((c)=> c.CarDetailsComponent), canActivate:[authGuard]},
    {path: '',redirectTo:'login', pathMatch:'full'},
    {path: '**',redirectTo:'cars'}
];
