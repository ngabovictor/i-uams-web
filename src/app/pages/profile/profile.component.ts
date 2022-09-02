import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailVerificationDialogComponent } from 'src/app/dialogs/email-verification-dialog/email-verification-dialog.component';
import { FilesTypeDialogComponent } from 'src/app/dialogs/files-type-dialog/files-type-dialog.component';
import { PasswordChangeDialogComponent } from 'src/app/dialogs/password-change-dialog/password-change-dialog.component';
import { SelectionTypeDialogComponent } from 'src/app/dialogs/selection-type-dialog/selection-type-dialog.component';
import { TextTypeDialogComponent } from 'src/app/dialogs/text-type-dialog/text-type-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private route: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  openPasswordChangeDialog(): void {

    this.dialog.open(PasswordChangeDialogComponent, {
      width: '560px',

    }).afterClosed().subscribe((result: any) => {
      if(result) {
        this.snackbar.open(result.detail, 'Close');
      }
    });
    
  }

  openEmailVerificationDialog(): void {

    this.dialog.open(EmailVerificationDialogComponent, {
      width: '560px',

    }).afterClosed().subscribe((result: any) => {
      if(result) {
        const profile = {
          ...result,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
      }
    });

  }


  openSelectionDialog(profile: any, type: string): void {
    this.dialog.open(SelectionTypeDialogComponent, {
      width: '480px',
      data: {
        profile,
        type
      }

    }).afterClosed().subscribe((result: any) => {
      if(result) {
        const profile = {
          ...result,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
      }
    });

  }

  openTextDialog(profile: any, type: string): void {
    this.dialog.open(TextTypeDialogComponent, {
      width: '480px',
      data: {
        profile,
        type
      }

    }).afterClosed().subscribe((result: any) => {
      if(result) {
        const profile = {
          ...result,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
      }
    })

  }

  openFilesDialog(profile: any, type: string): void {
    this.dialog.open(FilesTypeDialogComponent, {
      width: '480px',
      data: {
        profile,
        type
      }

    }).afterClosed().subscribe((result: any) => {
      if(result) {

        if(type == 'verification') {
          this.snackbar.open(result.detail, 'Close');
          this.getProfile();
          return;
        }
        const profile = {
          ...result,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
      }
    })

  }

  getProfile(): void {

    const path = `users/${this.profile.id}`;

    this.api.get(path).subscribe(
      (response: any) => {
        const profile = {
          ...response,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
      },
      (error: HttpErrorResponse) => {

        try {
          this.snackbar.open(error.error.detail, 'Retry', {
            duration: 3000,
          }).onAction().subscribe(() => {
            this.getProfile();
          });
        } catch (err) {
          this.snackbar.open("Something went wrong", 'Retry', {
            duration: 3000,
          }).onAction().subscribe(() => {
            this.getProfile();
          });
        }
      }
    );
  }

  logout() {
    window.sessionStorage.clear(); 
    this.api.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    }; 
     this.route.navigate(['/login']); 
  }

}
