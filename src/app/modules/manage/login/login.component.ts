import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor
  (
    public afAuth: AngularFireAuth, 
    private router: Router
  ) 
  {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user !== null) 
      {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() 
  {

  }

  login() 
  {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
