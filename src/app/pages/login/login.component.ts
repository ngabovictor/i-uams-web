import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(MatStepper) stepper!: MatStepper;

  today = new Date();
  passwordHide = true;
  usernameForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  isLoading = false;

  currenctStepIndex: number = 0;

  usingMagincLinkAuth: boolean = false;
  magicLinkSent: boolean = false;

  emailForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private api:ApiService
  ) { 
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]]
    });

    this.otpForm = this.fb.group({
      code: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const userData = JSON.parse(window.sessionStorage.getItem('profile') as string);

    if (userData != null) {
      if (userData.is_staff) {
        this.router.navigate(['stats/reports']);
      }
    }
  }

  get otpControl(): FormControl {
    return this.otpForm.get('code') as FormControl;
  }

  disableForm() {
    // this.loginForm.get('username')?.disable();
    // this.loginForm.get('password')?.disable();
  }

  enableForm() {
    // this.loginForm.get('username')?.enable();
    // this.loginForm.get('password')?.enable();
  }

  stepSelectionChange($event: StepperSelectionEvent): void {
    this.currenctStepIndex = $event.selectedIndex;

  }

  goToNextStep(): void {
    switch (this.currenctStepIndex) {
      case 0:
        this.requestOtp()
        break;
      
        case 1:
        this.verifyOtp()
        break;
    
      default:
        break;
    }

  }

  getMagicLink(): void {
    if(!this.emailForm.valid) {
      return;

    }

    this.isLoading = true;

      const data = this.emailForm.value;

      this.api.post('auth/generate-magic-link', data).subscribe((response: any) => {
        this.isLoading = false;
        this.magicLinkSent = true;

      }, (error: any) => {

        console.log(error);
        this.isLoading = false;

        try {
          
          
          this.snackbar.open(error.detail, 'Dismiss',{
            duration:  3000,
            panelClass:['blue-snackbar']
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      });
  }


  requestOtp(): void {
    if(!this.usernameForm.valid) {
      return;

    }

    this.isLoading = true;

      const data = this.usernameForm.value;

      this.api.post('auth/request-verification-code', data).subscribe((response: any) => {
        this.isLoading = false;
        this.stepper.next();

      }, (error: any) => {

        console.log(error);
        this.isLoading = false;

        try {
          
          
          this.snackbar.open(error.detail, 'Dismiss',{
            duration:  3000,
            panelClass:['blue-snackbar']
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      });
  }

  verifyOtp(): void {

    if(!this.otpForm.valid) {
      return;

    }

    this.isLoading = true;

      const data = {
        ...this.usernameForm.value,
        ...this.otpForm.value
      };

      this.api.post('auth/verify-otp', data).subscribe((response: any) => {
        this.isLoading = false;
        this.stepper.next();

      }, (error: HttpErrorResponse) => {

        console.log(error);
        this.isLoading = false;

        try {
          
          
          this.snackbar.open(error.error.detail, 'Dismiss',{
            duration:  3000,
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      });

  }

  login() {
    if(!this.passwordForm.valid) {
      return;

    }

    this.isLoading = true;

      const data = {
        ...this.usernameForm.value,
        ...this.otpForm.value,
        ...this.passwordForm.value
      };

      this.api.post('auth/authenticate', data).subscribe((response: any) => {
        this.isLoading = false;
        this.stepper.next();

      }, (error: HttpErrorResponse) => {

        console.log(error);
        this.isLoading = false;

        try {
          
          
          this.snackbar.open(error.error.detail, 'Dismiss',{
            duration:  3000,
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      });
  }


}
