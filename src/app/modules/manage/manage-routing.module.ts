import { FirebaseGuard } from './../../guards/firebase.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: '',       component: IndexComponent, canActivate:[FirebaseGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
