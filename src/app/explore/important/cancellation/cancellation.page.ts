import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.page.html',
  styleUrls: ['./cancellation.page.scss'],
})
export class CancellationPage implements OnInit {

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
