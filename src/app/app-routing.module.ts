import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'certification',  loadChildren: './modules/certification/certification.module#CertificationModule' },
  { path: 'education',      loadChildren: './modules/education/education.module#EducationModule' },
  { path: 'experience',     loadChildren: './modules/experience/experience.module#ExperienceModule' },
  { path: 'introduction',  loadChildren: './modules/introduction/introduction.module#IntroductionModule' },
  { path: 'project',        loadChildren: './modules/project/project.module#ProjectModule' },
  { path: 'skill',          loadChildren: './modules/skill/skill.module#SkillModule' },
  { path: '',               loadChildren: './modules/manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
