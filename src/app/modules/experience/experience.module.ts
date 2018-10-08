import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { GeneralModule } from '../../shared/general/general.module';

import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { ExperienceComponent } from './experience.component';

@NgModule({
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    GeneralModule
  ],
  declarations: [
    IndexComponent, 
    FormComponent, 
    ExperienceComponent
  ]
})
export class ExperienceModule { }
