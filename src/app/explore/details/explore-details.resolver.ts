import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExploreService } from '../explore.service';
import { ExploreDetailsModel } from './explore-details.model';
import { Observable } from 'rxjs';
import { DataStore } from '../../shell/data-store';

@Injectable()
export class ExploreDetailsResolver implements Resolve<any> {

  constructor(private exploreService: ExploreService) {}

  resolve() {
    const dataSource: Observable<ExploreDetailsModel> = this.exploreService.getDetailsDataSource();
    const dataStore: DataStore<ExploreDetailsModel> = this.exploreService.getDetailsStore(dataSource);

    return dataStore;
  }
}
