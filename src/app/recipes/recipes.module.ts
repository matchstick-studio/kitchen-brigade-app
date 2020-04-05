import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';
import { WordpressService } from '../services/wordpress.service';
import { ComponentsModule } from '../components/components.module';

import { RecipesPage } from './recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RecipesPageRoutingModule
  ],
  providers: [WordpressService ],
  declarations: [RecipesPage]
})
export class RecipesPageModule {}
