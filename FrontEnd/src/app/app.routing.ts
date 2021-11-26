import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { BusinessunitComponent } from './businessunit/businessunit.component';
import { DepartmentComponent } from './department/department.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'user-profile',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'auth',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },{
      path: 'user-profile', component: UserProfileComponent
  },{
    path: 'home', component: HomeComponent,canActivate:[AuthGuard]
},
{path: 'business_unit', component:BusinessunitComponent ,canActivate:[AuthGuard]},
{ path: 'business_unit/:id',        component: DepartmentComponent ,canActivate:[AuthGuard] },


]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatTableModule,

    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
