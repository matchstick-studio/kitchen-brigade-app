import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Booking } from '../../models/booking';
import { firestore } from 'firebase';
import { AuthService } from '../firestore/firebase-authentication.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class BookingService {

  private bookingCollection: AngularFirestoreCollection<Booking>;
  private bookings: Observable<Booking[]>;

  userBookings = [];

  constructor(
    public firestore: AngularFirestore,
    public authServ: AuthService
    ) { 
      let currentUser = this.getCurrentUser();
    if (currentUser) {
      this.refreshBookingsCollection(currentUser.uid)
    }
    }

    async refreshBookingsCollection(userId) {
      const user: firebase.User = await this.authServ.getUser();
      this.bookingCollection = this.firestore.collection('users').doc(`${user.uid}`).collection<Booking>('bookings');
        this.bookings = this.bookingCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ... data};
          }))
        )
    }

    async createBooking(booking: Booking): Promise<DocumentReference> {
        const user: firebase.User = await this.authServ.getUser();
        return await this.firestore.collection('users').doc(`${user.uid}`)
        .collection<Booking>('bookings').add(booking);
    };

    getCurrentUser() {
      if(firebase.auth().currentUser) {
        return firebase.auth().currentUser;
      } else {
        return null;
      }
    }

  }