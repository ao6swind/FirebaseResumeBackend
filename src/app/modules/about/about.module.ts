import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent, 
    IndexComponent
  ],
  bootstrap: [AboutComponent]
})
export class AboutModule { }
