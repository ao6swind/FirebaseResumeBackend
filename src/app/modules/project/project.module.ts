import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgZorroAntdModule
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
