import { FirebaseGuard } from './guards/firebase.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'certification', canActivate:[FirebaseGuard], loadChildren: './modules/certification/certification.module#CertificationModule' },
  { path: 'education',     canActivate:[FirebaseGuard], loadChildren: './modules/education/education.module#EducationModule' },
  { path: 'experience',    canActivate:[FirebaseGuard], loadChildren: './modules/experience/experience.module#ExperienceModule' },
  { path: 'introduction',  canActivate:[FirebaseGuard], loadChildren: './modules/introduction/introduction.module#IntroductionModule' },
  { path: 'project',       canActivate:[FirebaseGuard], loadChildren: './modules/project/project.module#ProjectModule' },
  { path: 'skill',         canActivate:[FirebaseGuard], loadChildren: './modules/skill/skill.module#SkillModule' },
  { path: '',              loadChildren: './modules/manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
