import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-text-type-dialog',
  templateUrl: './text-type-dialog.component.html',
  styleUrls: ['./text-type-dialog.component.scss']
})
export class TextTypeDialogComponent implements OnInit {

  form: FormGroup;

  isLoading: boolean = false;
  startDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<TextTypeDialogComponent>
  ) {
    switch (data.type) {
      case 'name':
        this.form = fb.group({
          first_name: [
            data.profile.first_name ? data.profile.first_name : '',
            [Validators.required],
          ],
          last_name: [
            data.profile.last_name ? data.profile.last_name : '',
            [Validators.required],
          ],
        });

        break;

      case 'email':
        this.form = fb.group({
          email: [
            data.profile.email
              ? data.profile.email
              : '',
            [Validators.required],
          ],
        });

        break;

      case 'phone_number':
        this.form = fb.group({
          phone_number: [
            data.profile.phone_number ? data.profile.phone_number : '',
            [Validators.required],
          ],
        });

        break;

      case 'birthdate':
        this.form = fb.group({
          birthdate: [
            data.profile.birthdate ? data.profile.birthdate : '',
            [Validators.required],
          ],
        });

        break;

      default:
        this.form = fb.group({});
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    const path = `users/${this.data.profile.id}`;
    let data = this.form.value;

    if(this.data.type == 'birthdate') {
      data = {
        birthdate: (this.form.value.birthdate as Date).toISOString().split("T")[0]
      };
    }

    this.api.patch(path, data).subscribe(
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
