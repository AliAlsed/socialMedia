import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
posts:any;
sub;
  constructor(private afFunction: AngularFireFunctions) { }

  ngOnInit() {
    const getFeed = this.afFunction.httpsCallable('getFeed');
    this.sub = getFeed({}).subscribe( data =>{
      this.posts = data
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
