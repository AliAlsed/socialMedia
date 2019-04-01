import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabBar, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  // access local variables
@ViewChild('tabs') tabs: IonTabs;

  constructor() { }

  ngOnInit() {
    // select the first tabs to show it first 
    console.log(this.tabs.getSelected());
    if(! this.tabs.getSelected()){
      this.tabs.select('feed');
    }
  }

}
