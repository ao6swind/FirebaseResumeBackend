import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../shared/general/general.module';
import { CKEditorModule } from 'ngx-ckeditor';

import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    IntroductionRoutingModule,
    GeneralModule,
    CKEditorModule
  ],
  declarations: [
    IntroductionComponent, 
    EditComponent
  ]
})
export class IntroductionModule { }
