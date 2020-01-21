import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.page.html',
  styleUrls: ['./ask.page.scss'],
})
export class AskPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  closeQuestionModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
