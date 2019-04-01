import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { LoadingComponent } from './loading/loading.component';
import { ShareModule } from './share.module';
import { AngularFireFunctionsModule , FunctionsRegionToken} from '@angular/fire/functions'
export const firebaseConfig = {
  apiKey: 'AIzaSyDYsv6gGquSn7XqtEVwiJsCijgLmtq4kGM',
  authDomain: 'socialapp-201c9.firebaseapp.com',
  databaseURL: 'https://socialapp-201c9.firebaseio.com',
  projectId: 'socialapp-201c9',
  storageBucket: 'socialapp-201c9.appspot.com',
  messagingSenderId: '930663781805'
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule,
    AngularFireFunctionsModule,
    ShareModule,
    AngularFirestoreModule,
    AngularFireAuthModule]
    ,
  providers: [
    StatusBar,
    AuthService,
    UserService,
    AngularFireDatabase,
    { provide : FunctionsRegionToken , useValue: 'us-central1' },
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
