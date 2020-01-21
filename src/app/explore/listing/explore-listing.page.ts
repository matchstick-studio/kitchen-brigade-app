import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExploreListingModel } from './explore-listing.model';

@Component({
  selector: 'app-explore-listing',
  templateUrl: './explore-listing.page.html',
  styleUrls: [
    './styles/explore-listing.page.scss',
    './styles/explore-listing.shell.scss'
  ]
})
export class ExploreListingPage implements OnInit {
  listing: ExploreListingModel;

  @HostBinding('class.is-shell') get isShell() {
    return (this.listing && this.listing.isShell) ? true : false;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((resolvedRouteData) => {
      const listingDataStore = resolvedRouteData['data'];

      listingDataStore.state.subscribe(
        (state) => {
          this.listing = state;
        },
        (error) => {}
      );
    },
    (error) => {});
  }
}
