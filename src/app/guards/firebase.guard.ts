import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseGuard implements CanActivate {

  private isAuth: boolean = false;

  constructor
  (
    public afAuth: AngularFireAuth, 
    private router: Router
  ) 
  {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user !== null) 
      {
        this.isAuth = true;
      }
    });
  }

  canActivate
  (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean 
  {
    if(this.isAuth)
    {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
