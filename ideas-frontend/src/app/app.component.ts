import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { AddError } from './store/actions/errors.action';
import { AuthDTO } from './models/auth';
import { LoginUser, SetInitialUser } from './store/actions/auth.action';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ideas-App';

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.token) {
      this.store.dispatch(new SetInitialUser());
    }
    this.store
      .select(state => state.error)
      .subscribe(val => this.showError(val));
  }

  showError(err) {
    if (err && err.error) {
      this.toastr.error(err.error.message || 'Internal server error', 'Error Message', {
        closeButton: true
      });

      if (err.error.message === 'Token error: jwt malformed') {
        this.authService.deleteToken();
        this.router.navigate(['/auth']);
      }
    }
  }
}
