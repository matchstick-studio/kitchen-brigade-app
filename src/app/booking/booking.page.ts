import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { counterRangeValidator } from '../components/counter-input/counter-input.component';
import { BookingService } from '../services/firestore/booking.service';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { Package } from '../models/package';
import { Booking } from '../models/booking';

import * as firebase from 'firebase';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  image;
  name;

  // Data passed in by componentProps
 @Input() packageInfo: Package[];
 @Input() packageId: string;

  bookingForm: FormGroup;

  validations = {
    
    'people': [
      { type: 'rangeError', message: 'Number must be between: ' }
    ],
    'date': [
      { type: '', message: 'Pick a valid date'}
    ],
    'time': [
      { type: '', message: 'Choose a valid time'}
    ],
    'alternatePhone': [
      { type: '', message: 'Enter valid mobile number'}
    ],
  };

  constructor(
    public router: Router,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public bookingService: BookingService,
    public authServ: AuthService
  ) { 
    console.log('Booking Requested: ', navParams.get('packageInfo'));
    console.log('Package Id: ', navParams.get('packageId'));
    console.log('User ID: ', firebase.auth().currentUser.uid);
  }

  ngOnInit() {

    this.bookingForm = new FormGroup({
      'date': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required),
      'people': new FormControl(2, counterRangeValidator(1, 100)),
      'alternatePhone': new FormControl('', Validators.minLength(10)),
      'notes': new FormControl('')
    });
  }

  async createBooking() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });

  const booking = {
      packageId: this.navParams.get('packageId'),
      date: this.bookingForm.value.date,
      time: this.bookingForm.value.time,
      people: this.bookingForm.value.people,
      alternatePhone: this.bookingForm.value.alternatePhone,
      notes: this.bookingForm.value.notes,
      status: ""
    };

    this.bookingService
    .createBooking(booking)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.modalCtrl.dismiss(),
          this.router.navigateByUrl('/app/bookings');
        });
      },
      error => {
        console.error(error);
      }
    );

    return await loading.present();
  }

  closeBookingModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  

}
