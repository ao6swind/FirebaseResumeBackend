import { title } from './variables/title';
import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { en_US, zh_TW, NzI18nService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent 
{
  public isCollapsed: boolean = false;
  public current: string = Date.now().toString();
  public language: string = 'zh-TW';

  constructor
  (
    public afAuth: AngularFireAuth, 
    public router: Router,
    public langService: LanguageService,
    public i18nService: NzI18nService
  ) 
  {
    // 從base href取的當前語言
    this.language = this.langService.getLanguage();
    
    // 設定網頁標題
    document.title = title[this.language];

    // 切換ng-zorro的語系
    switch(this.language)
    {
      case 'zh-TW':
        this.i18nService.setLocale(zh_TW);
        break;
      case 'en-US':
        this.i18nService.setLocale(en_US);
        break;
    }

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user == null) 
      {
        this.router.navigate(['login']);
      }
    });
  }

  logout(): void 
  {
    this.afAuth.auth.signOut();
  }

  redirect(): void 
  {
    window.location.href = `/${this.language}${this.router.url}`;
  }
}
