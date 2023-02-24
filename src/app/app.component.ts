import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fitness-tracker';
  @ViewChild('sideNav') sideNav!: MatSidenav;

  onToggleSideNav() {
    this.sideNav.toggle();
  };
}
