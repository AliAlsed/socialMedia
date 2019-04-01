import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  cpassword = '';
  constructor(public auth: AngularFireAuth,
     public alert: AlertController,
     public user:UserService,
     public router: Router,
      public firestore: AngularFirestore) { }

  ngOnInit() {
  }

  async Register() {
    const {email , password, cpassword} = this;
    if (password !== cpassword) {
      this.showAlert('Error', ' password dont match');
      console.error(' password dont match');
    }
      this.showAlert('Success', ' Welcome aboard!');
      const res = await this.auth.auth.createUserWithEmailAndPassword(email, password);
      this.firestore.doc(`users/${res.user.uid}`).set({
        email
      });
      this.user.setUser({
        email,
        uid: res.user.uid
      });
      console.log(res.user.uid);
      this.router.navigate(['/tabs']);
      console.dir(res);
  }
  async showAlert(header: string , message: string) {
    const Alert = await this.alert.create({
      header, message,
      buttons: [ 'ok']
    });
    await Alert.present();
  }

}
