import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.page.html',
  styleUrls: ['./requirements.page.scss'],
})
export class RequirementsPage implements OnInit {

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
