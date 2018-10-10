import { title } from './variables/title';
import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { PlatformLocation } from "@angular/common";
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent 
{
  private isCollapsed: boolean = false;
  private current: string = Date.now().toString();
  private language: string = 'zh-TW';

  constructor
  (
    private afAuth: AngularFireAuth, 
    private router: Router,
    private langService: LanguageService
  ) 
  {
    document.title = title[this.langService.getLanguage()];
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
    window.location.href = this.router.url.replace(this.langService.getBaseHref(), `/${this.language}/`);
  }
}
