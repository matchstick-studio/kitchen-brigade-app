import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { ExploreDetailsPage } from './explore-details.page';
import { ExploreDetailsResolver } from './explore-details.resolver';
import { ExploreService } from '../explore.service';

import { AskPage } from '../ask/ask.page';

import { DietaryPage } from '../important/dietary/dietary.page';
import { CancellationPage } from '../important/cancellation/cancellation.page';
import { CommunicationPage } from '../important/communication/communication.page';
import { RequirementsPage } from '../important/requirements/requirements.page';

import { BookingPage } from '../../booking/booking.page'; 

const routes: Routes = [
  {
    path: '',
    component: ExploreDetailsPage,
    resolve: {
      data: ExploreDetailsResolver
    }
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
  declarations: [
    ExploreDetailsPage,
    AskPage,
    DietaryPage,
    CancellationPage,
    CommunicationPage,
    RequirementsPage,
    BookingPage
  ],
  providers: [
    ExploreDetailsResolver,
    ExploreService
  ],
  entryComponents: [
    AskPage,
    DietaryPage,
    CancellationPage,
    CommunicationPage,
    RequirementsPage,
    BookingPage
  ]
})
export class ExploreDetailsPageModule {}
