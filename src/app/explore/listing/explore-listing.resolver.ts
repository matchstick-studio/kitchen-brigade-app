import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExploreService } from '../explore.service';
import { ExploreListingModel } from './explore-listing.model';
import { Observable } from 'rxjs';
import { DataStore } from '../../shell/data-store';

@Injectable()
export class ExploreListingResolver implements Resolve<any> {

  constructor(private exploreService: ExploreService) {}

  resolve() {
    const dataSource: Observable<ExploreListingModel> = this.exploreService.getListingDataSource();
    const dataStore: DataStore<ExploreListingModel> = this.exploreService.getListingStore(dataSource);

    return dataStore;
  }
}
