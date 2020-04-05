import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordpressService } from '../services/wordpress.service';

import { SavedPageRoutingModule } from './saved-routing.module';
import { ComponentsModule } from '../components/components.module';

import { SavedPage } from './saved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SavedPageRoutingModule
  ],
  providers: [ WordpressService ],
  declarations: [SavedPage]
})
export class SavedPageModule {}
