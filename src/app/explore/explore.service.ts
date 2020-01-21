import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DataStore } from '../shell/data-store';

import { ExploreListingModel } from './listing/explore-listing.model';
import { ExploreDetailsModel } from './details/explore-details.model';

@Injectable()
export class ExploreService {
  private listingDataStore: DataStore<ExploreListingModel>;
  private detailsDataStore: DataStore<ExploreDetailsModel>;

  constructor(private http: HttpClient) { }

  public getListingDataSource(): Observable<ExploreListingModel> {
    return this.http.get<ExploreListingModel>('./assets/data/experiences/listing.json');
  }

  public getListingStore(dataSource: Observable<ExploreListingModel>): DataStore<ExploreListingModel> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: ExploreListingModel = new ExploreListingModel();
      this.listingDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.listingDataStore.load(dataSource);
    }
    return this.listingDataStore;
  }

  public getDetailsDataSource(): Observable<ExploreDetailsModel> {
    return this.http.get<ExploreDetailsModel>('./assets/data/experiences/details.json');
  }

  public getDetailsStore(dataSource: Observable<ExploreDetailsModel>): DataStore<ExploreDetailsModel> {
    // Use cache if available
    if (!this.detailsDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: ExploreDetailsModel = new ExploreDetailsModel();
      this.detailsDataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.detailsDataStore.load(dataSource);
    }
    return this.detailsDataStore;
  }

}
