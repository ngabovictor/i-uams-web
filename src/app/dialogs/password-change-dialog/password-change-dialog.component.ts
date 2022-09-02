import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss']
})
export class PasswordChangeDialogComponent implements OnInit {

  form: FormGroup;

  isLoading: boolean = false;
  passwordHide = true;

  constructor(
    private api: ApiService,
    fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<PasswordChangeDialogComponent>
  ) {

    this.form = fb.group({
      password: [
        '', [Validators.required],
      ],
      new_password: [
        '', [Validators.required],
      ],
    });
   }

  ngOnInit(): void {
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    const path = `auth/change-password`;
    let data = this.form.value;

    this.api.post(path, data).subscribe(
      (response: any) => {
        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;

        try {
          this.snackbar.open(error.error.detail, 'Dismiss', {
            duration: 3000,
          });
        } catch (err) {
          this.snackbar.open('Network error', 'RETRY');
        }
      }
    );
  }

}
