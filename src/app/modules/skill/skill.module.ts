import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SkillRoutingModule
  ],
  declarations: [SkillComponent, IndexComponent, FormComponent]
})
export class SkillModule { }
