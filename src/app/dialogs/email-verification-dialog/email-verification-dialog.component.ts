import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-email-verification-dialog',
  templateUrl: './email-verification-dialog.component.html',
  styleUrls: ['./email-verification-dialog.component.scss']
})
export class EmailVerificationDialogComponent implements OnInit {

  @ViewChild(MatStepper) stepper!: MatStepper;

  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);
  
  isLoading: boolean = false;
  currenctStepIndex: number = 0;

  usernameForm: FormGroup;
  otpForm: FormGroup;

  constructor(
    private api: ApiService,
    fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<EmailVerificationDialogComponent>
  ) {
    this.usernameForm = fb.group({
      username: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = fb.group({
      code: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
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
        this.requestOtp()
        break;
      
        case 1:
        this.verifyOtp()
        break;
    
      default:
        break;
    }

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
        ...this.otpForm.value
      };

      this.api.post('verifications/verify-email', data).subscribe((response: any) => {
        this.isLoading = false;
        this.dialogRef.close(response);

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
