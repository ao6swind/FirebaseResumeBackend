import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'education',  loadChildren: './modules/education/education.module#EducationModule' },
  { path: 'experience', loadChildren: './modules/experience/experience.module#ExperienceModule' },
  { path: 'profile',    loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'project',    loadChildren: './modules/project/project.module#ProjectModule' },
  { path: 'skill',      loadChildren: './modules/skill/skill.module#SkillModule' },
  { path: '',           loadChildren: './modules/manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
