import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../services/firestore/firebase-authentication.service';
import { ProfileService } from '../../services/profile.service';
import { AlertController } from '@ionic/angular';
import { UserProfile } from '../../models/user';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  public userProfile: UserProfile;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  user: any;
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  error: string;

  constructor(
    public loadingController: LoadingController,
    public authService: AuthService,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private camera: Camera
  ) { 
  }

  ngOnInit(){
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  ionViewDidEnter() {  
    
  }

  async changeUserImage() {
    const imageOpts = await this.actionsheetCtrl.create({
      buttons: [
        {
        text: 'Take Photo',
        icon: '',
        handler: () => {
          console.log('take photo clicked');
        }
      }, {
        text: 'Choose Photo',
        icon: '',
        handler: () => {
          console.log('choose photo clicked');
        }
      },
      {
        text: 'Delete Photo',
        icon: '',
        handler: () => {
          console.log('delete clicked');
        }
      }, 
      {
        text: 'Cancel',
        icon: '',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await imageOpts.present();
  }

  async updateFirstName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Change name',
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
      header: 'Change name',
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
      header: 'Change phone number',
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

}
