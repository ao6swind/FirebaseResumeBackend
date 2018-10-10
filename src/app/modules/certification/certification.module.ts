import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationRoutingModule } from './certification-routing.module';
import { GeneralModule } from '../../shared/general/general.module';

import { CertificationComponent } from './certification.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    CertificationRoutingModule,
    GeneralModule
  ],
  declarations: [
    CertificationComponent, 
    IndexComponent, 
    FormComponent
  ]
})
export class CertificationModule { }
