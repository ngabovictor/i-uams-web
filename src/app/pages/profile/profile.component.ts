import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

}
