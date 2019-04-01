import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  constructor(public afAuth: AngularFireAuth,
     public auth: AuthService,
     public alert: AlertController,
      public user: UserService ,
       public route: Router) { }

  ngOnInit() {
  }
  async login() {
    const {email,password} = this;
    const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.dir(res);
      if (res.user) {
        this.user.setUser({
          email,
          uid : res.user.uid
        });
        this.showAlert('Success', 'logged in successfully');
        this.route.navigate(['/tabs']);

      }
    }
    async showAlert(header: string , message: string) {
      const Alert = await this.alert.create({
        header, message,
        buttons: [ 'ok']
      });
      await Alert.present();
    }

}
