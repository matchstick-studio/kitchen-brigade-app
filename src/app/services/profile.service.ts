import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userProfile: AngularFirestoreDocument<UserProfile>;
  private currentUser: firebase.User;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  async getUserProfile(): Promise<Observable<UserProfile>> {
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = this.firestore.doc(`users/${user.uid}`);
    return this.userProfile.valueChanges();
  }

  updateFirstName(firstname: string): Promise<void> {
    return this.userProfile.update({ firstname });
  }

  updateLastName(lastname: string): Promise<void> {
    return this.userProfile.update({ lastname });
  }

  updatePhone(phone: string): Promise<void> {
    return this.userProfile.update({ phone });
  }

  /* updatePicture(picture: string): Promise<void> {
    return this.userProfile.update({ picture });
  } */

  async updateEmail(newEmail: string, password: string): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      await this.currentUser.updateEmail(newEmail);
      return this.userProfile.update({ email: newEmail });
    } catch (error) {
      console.error(error);
    }
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    try {
      await this.currentUser.reauthenticateWithCredential(credential);
      return this.currentUser.updatePassword(newPassword);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUserProfile(firstname: string, lastname: string, phone: string) {
    const user: firebase.User = await this.authService.getUser();
    return await this.userProfile.update({ firstname, lastname, phone });
  }

}