import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

import { GeneralModule } from '../../shared/general/general.module';


@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    GeneralModule
  ],
  declarations: [
    ProjectComponent, 
    IndexComponent, 
    CreateComponent
  ],
  bootstrap: [
    ProjectComponent
  ]
})
export class ProjectModule { }
