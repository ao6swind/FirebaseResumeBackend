import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { GeneralModule } from '../../shared/general/general.module';

import { EducationComponent } from './education.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    EducationRoutingModule,
    GeneralModule
  ],
  declarations: [EducationComponent, CreateComponent, IndexComponent]
})
export class EducationModule { }
