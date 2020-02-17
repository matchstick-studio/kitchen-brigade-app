import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { ExploreDetailsPage } from './explore-details.page';
import { ExploreService } from '../explore.service';
import { BookingService } from '../../services/firestore/booking.service';
import { ProfileService } from '../../services/profile.service';

import { AskPage } from '../ask/ask.page';

import { CancellationPage } from '../important/cancellation/cancellation.page';
import { CommunicationPage } from '../important/communication/communication.page';

import { BookingPage } from '../../booking/booking.page'; 

const routes: Routes = [
  {
    path: '',
    component: ExploreDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [
    ExploreDetailsPage,
    AskPage,
    CancellationPage,
    CommunicationPage,
    BookingPage
  ],
  providers: [
    ExploreService,
    BookingService,
    ProfileService
  ],
  entryComponents: [
    AskPage,
    CancellationPage,
    CommunicationPage,
    BookingPage
  ]
})
export class ExploreDetailsPageModule {}
