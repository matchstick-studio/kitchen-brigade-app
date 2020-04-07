import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { Favorite } from '../models/favorite';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesCollection: AngularFirestoreCollection<Favorite>;
  private favorites: Observable<Favorite[]>;

  constructor(
      private firestore: AngularFirestore,
      private afAuth: AngularFireAuth,
      private authServ: AuthService
  ) {
    let currentUser = this.getCurrentUser();
    if (currentUser) {
      this.refreshFavoritesCollection(currentUser.uid)
    }
    
  }


  async refreshFavoritesCollection(userId) {
    const user: firebase.User = await this.authServ.getUser();
    this.favoritesCollection = this.firestore.collection('users').doc(`${user.uid}`).collection('favorites');
      this.favorites = this.favoritesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ... data};
        }))
      )
  }

  async deleteFavorite(recipeId: string) {
    const user: firebase.User = await this.authServ.getUser();
    return this.firestore.collection('users').doc(`${user.uid}`).collection('favorites').doc(recipeId).delete();
  }
  async addFavorite(recipeId: string) {
    const user: firebase.User = await this.authServ.getUser();
    return await this.firestore.collection('users').doc(`${user.uid}`).collection('favorites').doc(recipeId).set({recipeId});
  }

  getCurrentUser() {
    if(firebase.auth().currentUser) {
      return firebase.auth().currentUser;
    } else {
      return null;
    }
  }
  
}