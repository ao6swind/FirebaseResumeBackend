import { CKEditorModule } from 'ngx-ckeditor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CKEditorModule
  ],
  declarations: [ProfileComponent, EditComponent]
})
export class ProfileModule { }
