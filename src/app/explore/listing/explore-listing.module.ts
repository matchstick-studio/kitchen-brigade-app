import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { PostsComponent } from '../../components/posts/posts.component';
import { RecipesComponent } from '../../components/recipes/recipes.component';

import { ExploreListingPage } from './explore-listing.page';

import { ExploreService } from '../explore.service';

const routes: Routes = [
  {
    path: '',
    component: ExploreListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [ExploreListingPage, PostsComponent, RecipesComponent],
  providers: [
    ExploreService
  ]
})
export class ExploreListingPageModule {}
