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
  public current:string = Date.now().toString();
  public language:string = 'zh-TW';

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user == null) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
