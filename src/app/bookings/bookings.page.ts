import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/firestore/booking.service';
import { Booking } from '../models/booking';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AuthService } from '../services/firestore/firebase-authentication.service'

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  userBookings = [];
  bookingsList = null;
  today = new Date();

  packageId: string;
  package

  constructor(
    public bookingService: BookingService,
    public firestore: AngularFirestore,
    public authServ: AuthService
  ) { 
  }

  async ngOnInit() {
    const user: firebase.User = await this.authServ.getUser();
    this.bookingsList = this.firestore.collection(`users/${user.uid}/bookings`).valueChanges().subscribe({
      next: (userBookings: Booking[]) => {
        console.log('Bookings: ' + JSON.stringify(userBookings));
        this.userBookings = userBookings;
      },
      error: () => { console.log('Error'); },
      complete: () => { console.log('Complete'); }
    });

  }
}
