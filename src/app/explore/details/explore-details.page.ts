import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';

import { Package } from '../../models/package';
import { ExploreService } from '../explore.service';
import { Observable } from 'rxjs';

import { AskPage } from '../ask/ask.page';
import { CancellationPage } from '../important/cancellation/cancellation.page';
import { CommunicationPage } from '../important/communication/communication.page';
import { BookingPage } from '../../booking/booking.page';

@Component({
  selector: 'app-explore-details',
  templateUrl: './explore-details.page.html',
  styleUrls: [
    './styles/explore-details.page.scss'
  ]
})
export class ExploreDetailsPage implements OnInit {
    
  public package: Observable<Package>
  packageJazz: Package;

  constructor(
    private exploreService : ExploreService,
    public actionsheetCtrl: ActionSheetController,
    public modalCtl: ModalController,
    private route: ActivatedRoute) { 

    }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.package = this.exploreService.getPackageDetails(id).valueChanges();

    this.exploreService.getPackageDetails(id)
    .valueChanges()
    .subscribe(packageInfo => {
      this.packageJazz = packageInfo;
    })
    
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

  async startBooking() {
    const modal = await this.modalCtl.create({
      component: BookingPage,
      componentProps: {
        packageInfo: this.packageJazz,
        'packageId': this.route.snapshot.paramMap.get('id')
      }
    });
    return await modal.present();
  }
}
