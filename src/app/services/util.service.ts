import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  userid: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(public loadingController: LoadingController, private fireAuth: AngularFireAuth, private router: Router, private toastController: ToastController, private nav: NavController, public alertController: AlertController, public modalCtrl: ModalController) {
    this.getUserId();
  }

  getUserId() {
    this.fireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userid.next(user.uid);
      }
    });
  }

  navigate(link, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }


  removeConform(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {

              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {

              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Verifying ...',
      duration: 3000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

}
