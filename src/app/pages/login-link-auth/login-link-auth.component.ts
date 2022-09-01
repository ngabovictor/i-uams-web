import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-link-auth',
  templateUrl: './login-link-auth.component.html',
  styleUrls: ['./login-link-auth.component.scss']
})
export class LoginLinkAuthComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: string | null = null; 

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const loginId = params['login_id'];

      if(loginId) {
        this.login(loginId);
      }
    })
  }

  login(loginId: string): void {
  
      this.isLoading = true;
      this.errorMessage = null;
  
        this.api.get(`auth/login-with-magic-link?login_id=${loginId}`).subscribe((response: any) => {
          this.isLoading = false;
          this.errorMessage = null;
          window.sessionStorage.setItem("profile", JSON.stringify(response));
          this.router.navigate(['/dashboard']);
  
        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
  
          try {

            this.errorMessage = error.error.detail;

          } catch (err) {
            this.errorMessage = "Network error";
          }

          this.snackbar.open(this.errorMessage!, 'Retry',{
            duration:  3000,
          }).onAction().subscribe(() => {
            this.login(loginId);
          });
        });
  

  }

}
