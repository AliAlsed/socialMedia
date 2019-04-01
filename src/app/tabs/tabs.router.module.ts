import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'posts/:id', loadChildren: '../post/post.module#PostPageModule' },

        ]
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }