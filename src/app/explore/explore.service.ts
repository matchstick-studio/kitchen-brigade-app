import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Package } from '../models/package';

@Injectable()
export class ExploreService {

  constructor(
    public firestore: AngularFirestore
    ) { }

    getPackages(): AngularFirestoreCollection<Package> {
      return this.firestore.collection('packages',ref => ref.orderBy("position", "asc"));
    }

  getPackageDetails(id: string): AngularFirestoreDocument<Package> {
    return this.firestore.collection(`packages`).doc(id);
  }

} 