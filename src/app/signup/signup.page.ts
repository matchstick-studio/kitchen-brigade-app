import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from '../models/user';
import { ModalController } from '@ionic/angular'
import { TermsOfServicePage } from '../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../validators/password.validator';
import { UtilService } from '../services/util.service';
import { AuthService } from '../services/firestore/firebase-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: [
    './styles/signup.page.scss'
  ]
})
export class SignupPage implements OnInit {

  firstname = '';
  lastname = '';
  email = '';
  phone = '';
  password = '';
 
  signUpForm: FormGroup;
  matching_passwords_group: FormGroup;

  validations = {
    'firstname': [
      { type: 'required', message: 'First name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Password confirmation is required.' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ]
  };
  constructor(
    public router: Router,
    public util: UtilService,
    private authServ: AuthService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.signUpForm = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'phone': new FormControl('', Validators.required),
      'matching_passwords': this.matching_passwords_group,
      'terms': new FormControl(true, Validators.pattern('true'))
    });
  }

  signup() {
      this.authServ.signup(this.signUpForm.value.email, this.matching_passwords_group.value.password).then(
        userData => {
          this.util.presentToast('Welcome to KitchenBrigade, please login!', true, 'bottom', 2100);
          this.authServ.userId = userData.user.uid;
          this.util.navigate('auth/login', false);
        }
      ).catch(err => {
        if (err) {
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
        }
      });
  }

  async showTermsModal() {
    const modal = await this.modalCtrl.create({
      component: TermsOfServicePage
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalCtrl.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }

}
