import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Output() closeSideNav = new EventEmitter<void>();
  
  onClose() {
    this.closeSideNav.emit();
  }
}
