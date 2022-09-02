import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-files-type-dialog',
  templateUrl: './files-type-dialog.component.html',
  styleUrls: ['./files-type-dialog.component.scss'],
})
export class FilesTypeDialogComponent implements OnInit {
  form: FormGroup;
  formData: FormData = new FormData();

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<FilesTypeDialogComponent>
  ) {
    switch (data.type) {
      case 'profile_photo':
        this.form = fb.group({
          profile_photo: ['', [Validators.required]],
        });

        break;

      case 'verification':
        this.form = fb.group({
          nid_number: ['', [Validators.required]],
          nid_document: ['', [Validators.required]],
        });

        break;

      default:
        this.form = fb.group({});
    }
  }

  ngOnInit(): void {}

  onFileSelectionChange($event: any): void {
    
    if ($event.target.files && ($event.target.files[0] as File)) {
      const file = $event.target.files[0] as File;

      if(this.data.type == "profile_photo") {
        this.formData.append('profile_photo', file);
      } else if(this.data.type == "verification") {
        this.formData.append('nid_document', file);
      }
      
    }


  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    let path = `users/${this.data.profile.id}`;

    if(this.data.type == "verification") {
      path = `verifications/upload-verification-documents`;
      this.formData.append('nid_number', this.form.value.nid_number);

      this.api.postFormData(path, this.formData).subscribe(
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

      return;
    }

    this.api.patchFormData(path, this.formData).subscribe(
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
