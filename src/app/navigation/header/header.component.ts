import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppCompleteState } from 'src/app/app.reducer';
import { selectIsAuthenticated } from 'src/app/shared/reducers/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppCompleteState>) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(selectIsAuthenticated)
  }
  
  onToggleSideNav() {
    this.sideNavToggle.emit();
  };

  onLogout() {
    this.authService.logout();
  }
}
