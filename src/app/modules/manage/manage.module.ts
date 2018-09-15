import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_TW } from 'ng-zorro-antd';
import { ManageRoutingModule } from './manage-routing.module';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule,
    NgZorroAntdModule,
  ],
  declarations: [LoginComponent, ManageComponent, IndexComponent]
})
export class ManageModule { }
