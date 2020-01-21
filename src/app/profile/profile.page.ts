import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AlertController } from '@ionic/angular';
import { UserProfile } from '../models/user';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userProfile: UserProfile;
  PackageName: string;
  VersionCode: string|number;
  VersionNumber: string

  constructor(
    private platform: Platform,
    private router: Router,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    public authService: AuthService,
  ) {
    if(this.platform.is('cordova')) { 
   this.appVersion.getPackageName().then(value => {
      this.PackageName = value;
    }).catch(err => {
      alert(err);
    });
    this.appVersion.getVersionCode().then(value => {
      this.VersionCode = value;
    }).catch(err => {
      alert(err);
    });
    this.appVersion.getVersionNumber().then(value => {
      this.VersionNumber = value;
    }).catch(err => {
      alert(err);
    });
   }
  }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }


}
