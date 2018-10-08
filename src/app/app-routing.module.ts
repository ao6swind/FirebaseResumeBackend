import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'certification',  loadChildren: './modules/certification/certification.module#CertificationModule' },
  { path: 'education',      loadChildren: './modules/education/education.module#EducationModule' },
  { path: 'experience',     loadChildren: './modules/experience/experience.module#ExperienceModule' },
  { path: 'file',           loadChildren: './modules/file/file.module#FileModule' },
  { path: 'profile',        loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'project',        loadChildren: './modules/project/project.module#ProjectModule' },
  { path: 'skill',          loadChildren: './modules/skill/skill.module#SkillModule' },
  { path: '',               loadChildren: './modules/manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
