import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: [
    './styles/forgot-password.page.scss'
  ]
})

export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    public authServ: AuthService,
    public util: UtilService
  ) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  recoverPassword() {
    this.util.openLoader();
    this.authServ.resetPassword(this.forgotPasswordForm.value.email)
    this.util.closeLoading();
    this.router.navigate(['auth/login']);
  }

}
