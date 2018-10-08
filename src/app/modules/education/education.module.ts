import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { GeneralModule } from '../../shared/general/general.module';

import { EducationComponent } from './education.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    EducationRoutingModule,
    GeneralModule
  ],
  declarations: [
    EducationComponent, 
    IndexComponent, 
    FormComponent
  ]
})
export class EducationModule { }
