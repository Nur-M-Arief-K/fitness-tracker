import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppCompleteState } from 'src/app/app.reducer';
import { selectIsAuthenticated } from 'src/app/shared/reducers/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  
  constructor(private authService: AuthService, private store: Store<AppCompleteState>) {}
  
  ngOnInit(): void {
    this.isAuth$ = this.store.select(selectIsAuthenticated);
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
