import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    window.sessionStorage.clear(); 
    this.api.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    }; 
     this.route.navigate(['login']); 
  }

}
