import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtilService } from '../services/util.service';
import * as firebase from 'firebase';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [
    './styles/login.page.scss'
  ]
})
export class LoginPage implements OnInit {

  public email: any = '';
  public password: any = '';
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private platform: Platform, 
    public loadingController: LoadingController, 
    public alertController: AlertController,
    private splashScreen: SplashScreen, 
    public util: UtilService,
    private authServ: AuthService) {

      this.email = '';
      this.password = '';

      this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ]))
      });

     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

      },
      'expired-callback': () => {
        console.log('expired-callback');
      }
    });
  }

  signin() {
      this.util.openLoader();
      this.authServ.login(this.loginForm.value.email, this.loginForm.value.password).then(
        userData => {
          this.util.navigate('/app/explore', false);
          this.email = '';
          this.password = '';
          this.authServ.userId = userData.user.uid;
        }
      ).catch(err => {
        if (err) {
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
        }

      }).then(el => this.util.closeLoading());
  }

}
