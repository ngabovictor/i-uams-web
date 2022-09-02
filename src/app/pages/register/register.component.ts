import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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
    private api: ApiService
  ) {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]],
    });

    this.otpForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const profile = JSON.parse(
      window.sessionStorage.getItem('profile') as string
    );

    if (profile != null && profile != undefined) {
      this.router.navigate(['/dashboard/profile']);
    }
  }

  get otpControl(): FormControl {
    return this.otpForm.get('code') as FormControl;
  }

  stepSelectionChange($event: StepperSelectionEvent): void {
    this.currenctStepIndex = $event.selectedIndex;
  }

  goToNextStep(): void {
    switch (this.currenctStepIndex) {
      case 0:
        this.requestOtp();
        break;

      case 1:
        this.verifyOtp();
        break;

      case 2:
        this.setPassword();
        break;

      default:
        break;
    }
  }

  requestOtp(): void {
    if (!this.usernameForm.valid) {
      return;
    }

    this.isLoading = true;

    const data = this.usernameForm.value;

    this.api.post('auth/request-verification-code', data).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.stepper.next();
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;

        try {
          this.snackbar.open(error.detail, 'Dismiss', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      }
    );
  }

  verifyOtp(): void {
    if (!this.otpForm.valid) {
      return;
    }

    this.isLoading = true;

    const data = {
      ...this.usernameForm.value,
      ...this.otpForm.value,
    };

    this.api.post('auth/verify-otp', data).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.stepper.next();
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;

        try {
          this.snackbar.open(error.error.detail, 'Dismiss', {
            duration: 3000,
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      }
    );
  }

  setPassword() {
    if (!this.passwordForm.valid) {
      return;
    }

    this.isLoading = true;

    const data = {
      ...this.usernameForm.value,
      ...this.otpForm.value,
      ...this.passwordForm.value,
    };

    this.api.post('auth/verify-change-password', data).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.stepper.next();
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;

        try {
          this.snackbar.open(error.error.detail, 'Dismiss', {
            duration: 3000,
          });
        } catch (error) {
          this.snackbar.open('Network error', 'RETRY');
        }
      }
    );
  }
}
