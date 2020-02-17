import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/firestore/firebase-authentication.service';
import { ProfileService } from '../../services/profile.service';
import { UtilService } from '../../services/util.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserProfile } from '../../models/user';
import 'firebase/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public userProfile: UserProfile;

  profileForm: FormGroup;

  validations = {
    'firstname': [
      { type: 'required', message: 'First name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
  };

  constructor(
    public router: Router,
    public authServ: AuthService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private util: UtilService,
    private camera: Camera,
  ) { }

  ngOnInit(): void {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });

    this.profileForm = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl(''),
      'phone': new FormControl('', Validators.required)
    });
  }

  async updateProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Updating...',
      duration: 3000
    });

    const firstname = this.profileForm.value.firstname;
    const lastname = this.profileForm.value.lastname;
    const phone = this.profileForm.value.phone;

    this.profileService
    .updateUserProfile(firstname, lastname, phone)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/app/explore');
        });
      },
      error => {
        console.error(error);
      }
    );

    return await loading.present();
  }

}
