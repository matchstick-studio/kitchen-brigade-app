import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dietary',
  templateUrl: './dietary.page.html',
  styleUrls: ['./dietary.page.scss'],
})
export class DietaryPage implements OnInit {

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
