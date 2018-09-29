import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from './../../shared/general/general.module';
import { CKEditorModule } from 'ngx-ckeditor';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CKEditorModule,
    GeneralModule
  ],
  declarations: [ProfileComponent, EditComponent]
})
export class ProfileModule { }
