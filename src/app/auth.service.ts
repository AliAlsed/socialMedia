import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router,CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  async canActivate(route) {
    if(await this.afAuth.isAuthenticated()){
      return true;
    } 
    this.router.navigate(['/login']);
    return false;
  }

  constructor(public afAuth: UserService , private router:Router) { }


}