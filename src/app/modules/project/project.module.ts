import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

import { GeneralModule } from '../../shared/general/general.module';
import { KeywordComponent } from './component/keyword/keyword.component';
import { MilestoneComponent } from './component/milestone/milestone.component';
import { ScreenComponent } from './component/screen/screen.component';


@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    GeneralModule
  ],
  declarations: [
    ProjectComponent, 
    IndexComponent, 
    CreateComponent, 
    KeywordComponent, 
    MilestoneComponent, 
    ScreenComponent
  ],
  bootstrap: [
    ProjectComponent
  ]
})
export class ProjectModule { }
