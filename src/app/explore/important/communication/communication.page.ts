import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.page.html',
  styleUrls: ['./communication.page.scss'],
})
export class CommunicationPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

    closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
