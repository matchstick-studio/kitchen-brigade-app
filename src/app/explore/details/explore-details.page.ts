import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';

import { ExploreDetailsModel } from './explore-details.model';
import { AskPage } from '../ask/ask.page';
import { DietaryPage } from '../important/dietary/dietary.page';
import { CancellationPage } from '../important/cancellation/cancellation.page';
import { CommunicationPage } from '../important/communication/communication.page';
import { RequirementsPage } from '../important/requirements/requirements.page';

import { BookingPage } from '../../booking/booking.page';

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.page.html',
  styleUrls: [
    './styles/explore-details.page.scss',
    './styles/explore-details.shell.scss'
  ]
})
export class ExploreDetailsPage implements OnInit {
  details: ExploreDetailsModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.details && this.details.isShell) ? true : false;
  }

  constructor(
    public actionsheetCtrl: ActionSheetController,
    public modalCtl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((resolvedRouteData) => {
      const detailsDataStore = resolvedRouteData['data'];

      detailsDataStore.state.subscribe(
        (state) => {
          this.details = state;
        },
        (error) => {}
      );
    },
    (error) => {});
  }
  async presentshareSheet() {
    const shareSheet = await this.actionsheetCtrl.create({
      header: 'Share',
      buttons: [
        {
        text: 'Copy link',
        icon: '',
        handler: () => {
          console.log('Copy clicked');
        }
      }, {
        text: 'Email',
        icon: '',
        handler: () => {
          console.log('Email clicked');
        }
      }, {
        text: 'WhatsApp',
        icon: '',
        handler: () => {
          console.log('WhatsApp clicked');
        }
      },
      {
        text: 'More',
        icon: '',
        handler: () => {
          console.log('More clicked');
        }
      },
      {
        text: 'Close',
        icon: '',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await shareSheet.present();
  }

  async presentAskModal(){
    const askQuestion = await this.modalCtl.create({
      component: AskPage
    });
    return await askQuestion.present();
  }
  async presentDietaryPreferences(){
    const dietaryPrefs = await this.modalCtl.create({
      component: DietaryPage
    });
    return await dietaryPrefs.present();
  }
  async presentCancellationPolicy(){
    const cancellationModal = await this.modalCtl.create({
      component: CancellationPage
    });
    return await cancellationModal.present();
  }
  async presentCommsPolicy(){
    const commsPolicy = await this.modalCtl.create({
      component: CommunicationPage
    });
    return await commsPolicy.present();
  }
  async presentRequirements(){
    const requirements = await this.modalCtl.create({
      component: RequirementsPage
    });
    return await requirements.present();
  }

  async startBooking(){
    const modal = await this.modalCtl.create({
      component: BookingPage
    });
    return await modal.present();
  }
}
