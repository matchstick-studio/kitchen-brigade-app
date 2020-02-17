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
    this.favoritesCollection = this.firestore.collection('users').doc(`${user.uid}`).collection<Favorite>('favorites');
      this.favorites = this.favoritesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ... data};
        }))
      )
  }

  getFavorites() {
    return this.favorites;
  }
async updateFavorite(favorite: Favorite): Promise<void> {
    const user: firebase.User = await this.authServ.getUser();
    return this.firestore.collection('users').doc(`${user.uid}`).collection<Favorite>('favorites').doc(favorite.id).update(favorite);
  }
  deleteFavorite(id: string) {
    this.favoritesCollection.doc(id).delete();
  }
  async addFavorite(favorite: Favorite): Promise<DocumentReference> {
    const user: firebase.User = await this.authServ.getUser();
    return await this.firestore.collection('users').doc(`${user.uid}`).collection<Favorite>('favorites').add(favorite);
  }

  getCurrentUser() {
    if(firebase.auth().currentUser) {
      return firebase.auth().currentUser;
    } else {
      return null;
    }
  }
  
}