import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  @ViewChild('sideNav') sideNav!: MatSidenav;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.initAuthListener();
  }

  onToggleSideNav() {
    this.sideNav.toggle();
  };
}
