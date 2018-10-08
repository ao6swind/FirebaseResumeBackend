import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FileRoutingModule
  ],
  declarations: [FileComponent, IndexComponent, FormComponent]
})
export class FileModule { }
