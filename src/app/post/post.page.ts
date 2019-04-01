import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  postId:string;
  post:any;
  sub;
  postReference: AngularFirestoreDocument;
  HeartType:string="heart-empty";

  constructor( private router : ActivatedRoute ,private user: UserService,private afs:AngularFirestore) { 
  }

  ngOnInit() {
    this.postId = this.router.snapshot.paramMap.get('id');
    this.postReference = this.afs.doc(`posts/${this.postId}`);
    this.sub = this.postReference.valueChanges().subscribe( val => {
       this.post = val;
       this.HeartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty';
     });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  toggleHeart(){
    if ( this.HeartType == 'heart-empty') {
      this.postReference.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    } else {
      this.postReference.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
    }

}
