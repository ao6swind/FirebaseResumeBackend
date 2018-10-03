import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  private isCollapsed: boolean = false;
  private current: string = Date.now().toString();
  private language: string = 'zh-TW';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user == null) {
        this.router.navigate(['login']);
      }
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  redirect(): void {
    console.log(this.language);
  }
}
