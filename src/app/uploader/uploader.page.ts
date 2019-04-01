import { Component, OnInit, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { from } from 'rxjs';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  @ViewChild('filebtn') filebtn;
  busy : boolean = false;
  ImageUrl:string;
  desc:string;
  
  constructor(public http: Http,
    public user:UserService,
     public affirestore:AngularFirestore
     , private aler: AlertController,
    private router : Router) { }

  ngOnInit() {
  }
  async save() {
    this.busy = true;
    const image = this.ImageUrl;
    const description = this.desc;
    this.affirestore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(image)
    });
    this.affirestore.doc(`posts/${image}`).set({
      description,
      author:this.user.getUserName(),
      likes:[]
    });
    this.busy = false;
    this.ImageUrl = null;
    this.desc = ' ';

    const alert = await this.aler.create({
      header: ' Done ',
      message: ' Added Successfully ',
      buttons: ['ok']
    })
    await alert.present();
    this.router.navigate(['/tabs/feed']);

  }
  //
  fileChanges( event)
   {
     this.busy = true;
     const files = event.target.files;
     console.dir(files);
     const data = new FormData();
     data.append('file', files[0]);
     data.append('UPLOADCARE_STORE', '1');
     data.append('UPLOADCARE_PUB_KEY', '11b30e78a493a5f70b0d');
     this.http.post('https://upload.uploadcare.com/base/', data).subscribe(event=>{
       console.log(event);
       this.ImageUrl = event.json().file;
       this.busy = false;
     })
  }
  uploadFile(){
    this.filebtn.nativeElement.click();
  }

}
/*
curl -F "UPLOADCARE_PUB_KEY=demopublickey" \
     -F "UPLOADCARE_STORE=1" \
     -F "file=@image.jpeg" \
     "https://upload.uploadcare.com/base/"


*/