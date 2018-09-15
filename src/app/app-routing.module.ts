import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'project',  loadChildren: './modules/project/project.module#ProjectModule' },
  { path: 'about',    loadChildren: './modules/about/about.module#AboutModule' },
  { path: '',         loadChildren: './modules/manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
