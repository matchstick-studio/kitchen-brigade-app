import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user';

import { ProfileService } from '../../services/profile.service';

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

  public userProfile: UserProfile;

  constructor(
    public exploreService: ExploreService,
    private profileService: ProfileService
    ) { }

  ngOnInit() {

    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });

    this.packageList = this.exploreService.getPackages().valueChanges(
      {idField: 'packageId'}
    );
  }
}
