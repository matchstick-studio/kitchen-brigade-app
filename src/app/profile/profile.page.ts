import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { UserProfile } from '../models/user';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  browserOptions : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  public userProfile: UserProfile;

  user: any;
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  error: string;

  PackageName: string;
  VersionCode: string|number;
  VersionNumber: string

  constructor(
    private iab: InAppBrowser,
    private safariViewController: SafariViewController,
    public loadingController: LoadingController,
    private platform: Platform,
    private router: Router,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    public authService: AuthService,
    public actionsheetCtrl: ActionSheetController,
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

  openPage(url: string, readerMode) {

    this.safariViewController.isAvailable()
    .then((available: boolean) => {
      if (available) {
        this.safariViewController.show({
              url: url,
              hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
              animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
              transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
              enterReaderModeIfAvailable: readerMode, // default false
              tintColor: "#00ffff", // default is ios blue
              barColor: "#0000ff", // on iOS 10+ you can change the background color as well
              controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
            })
            .subscribe((result: any) => {
              if(result.event === 'opened') console.log('Opened');
              else if(result.event === 'loaded') console.log('Loaded');
              else if(result.event === 'closed') console.log('Closed');
            },
            (error: any) => console.error(error)
          );
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        let target = '_blank';
        this.iab.create(url, target, this.browserOptions);
      }
    })
    
  }

  async updateFirstName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Update first name',
      inputs: [
        {
          type: 'text',
          name: 'firstname',
          placeholder: 'Your first name',
          value: this.userProfile.firstname
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateFirstName(data.firstname);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updateLastName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Update last name',
      inputs: [
        {
          type: 'text',
          name: 'lastname',
          placeholder: 'Your last name',
          value: this.userProfile.lastname
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateLastName(data.lastname);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updatePhone(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Update phone number',
      inputs: [
        {
          type: 'text',
          name: 'phone',
          placeholder: 'Mobile number',
          value: this.userProfile.phone
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePhone(data.phone);
          }
        }
      ]
    });
    return await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Update email',
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    return await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Update password',
      inputs: [
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'confirmNewPassword', placeholder: 'Retype password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    return await alert.present();
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('auth/login');
  }


}
