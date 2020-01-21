import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        children: [
          {
            path: '',
            loadChildren: () => import('../explore/listing/explore-listing.module').then(m => m.ExploreListingPageModule)
          },
          {
            path: 'details/:productId',
            loadChildren: () => import('../explore/details/explore-details.module').then(m => m.ExploreDetailsPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'profile/edit',
            loadChildren: () => 
            import('../profile/edit/edit.module').then(m => m.EditPageModule)
      },
    ]
  },
  // /app/ redirect
  {
    path: '',
    redirectTo: 'app/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
