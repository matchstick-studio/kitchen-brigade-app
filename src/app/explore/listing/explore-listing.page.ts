import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Package } from '../../models/package';

import { ExploreService  } from '../explore.service';

@Component({
  selector: 'app-explore-listing',
  templateUrl: './explore-listing.page.html',
  styleUrls: [
    './styles/explore-listing.page.scss'
  ]
})
export class ExploreListingPage implements OnInit {

  public packageList;

  constructor(
    public exploreService: ExploreService
    ) { }

  ngOnInit() {
    this.packageList = this.exploreService.getPackages().valueChanges(
      {idField: 'packageId'}
    );
  }
}
