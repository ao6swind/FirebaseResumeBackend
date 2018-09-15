import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule
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
