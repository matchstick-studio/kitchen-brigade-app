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
            path: 'details/:id',
            loadChildren: () => import('../explore/details/explore-details.module').then(m => m.ExploreDetailsPageModule)
          },
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../posts/posts.module').then(m => m.PostsPageModule)
          },
        ]
      },
      {
        path: 'post-details/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../post-details/post-details.module').then(m => m.PostDetailsPageModule)
          },
        ]
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../recipes/recipes.module').then(m => m.RecipesPageModule)
          },
        ]
      },
      {
        path: 'recipe-details/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../recipe-details/recipe-details.module').then(m => m.RecipeDetailsPageModule)
          },
        ]
      },
      {
        path: 'bookings',
        children: [
          {
            path: '',
            loadChildren: () => import('../bookings/bookings.module').then(m => m.BookingsPageModule)
          }
        ]
      },
      {
        path: 'saved',
        children: [
          {
            path: '',
            loadChildren: () => import('../saved/saved.module').then(m => m.SavedPageModule)
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
