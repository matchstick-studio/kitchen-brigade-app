import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/firestore/booking.service';
import { Booking } from '../models/booking';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import * as firebase from 'firebase';
import { Package } from '../models/package';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  public package: Observable<Package>;

  userBookings = [];
  bookingsList = null;
  today = new Date();
  packageId: Array<Package>;

  constructor(
    public bookingService: BookingService,
    public firestore: AngularFirestore,
    public authServ: AuthService
  ) { 
    
  }


 ngOnInit() {
  this.getBookingDetails();
  }


async getBookingDetails() {
    const user: firebase.User = await this.authServ.getUser();
    this.bookingsList = this.firestore.collection(`users/${user.uid}/bookings`, ref => ref.orderBy('date')).valueChanges().subscribe({
      next: (userBookings: Booking[]) => {
        console.log('Bookings: ' + JSON.stringify(userBookings));
        this.userBookings = userBookings;
        for (let i = 0; i < userBookings.length; i++) {
          console.log('Package Id', userBookings[i].packageId);
        }
      },
      error: () => { console.log('Error'); },
      complete: () => { console.log('Complete'); }
    });
  }

  /* async getBookingDetails() {

    const user: firebase.User = await this.authServ.getUser();
    this.joined$ = this.firestore.collection<Booking>(`users/${user.uid}/bookings`)
    .valueChanges()
    .pipe(
      switchMap(bookings => {
        const packageIds = uniq(bookings.map(bp => bp.packageId))
  
        return combineLatest(
          of(bookings),
          combineLatest(
            packageIds.map(packageId =>
              this.firestore.collection<Package>('packages', ref => ref.where('packageId', '==', packageId)).valueChanges().pipe(
                map(packages => packages[0])
              )
            )
          )
        )
      }),
      map(([bookings, packages]) => {
  
        return bookings.map(booking => {
          return {
            ...bookings,
            package: packages.find(a => a.packageId === booking.packageId)
          }
        })
      })
    )
  
  } */

  
}
