import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }      from './pages/admin/admin.component';
import { LoginComponent }      from './pages/login/login.component';
import { DatabasesComponent }      from './pages/databases/databases.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'databases', component: DatabasesComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
