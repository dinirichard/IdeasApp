import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { AddError } from './store/actions/errors.action';
import { AuthDTO } from './models/auth';
import { LoginUser, SetInitialUser } from './store/actions/auth.action';
import { ToastrService } from 'ngx-toastr';
import { isNull } from 'util';

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
  ) { }

  ngOnInit() {
    this.store.dispatch(
      // new LoginUser({
      //   username: 'admin',
      //   password: 'admin'
      // } as AuthDTO)
      new SetInitialUser()
    );
    this.store
      .select(state => state.error)
      .subscribe(val => this.showError(val));
  }

  showError(err) {
    if (err && err.error) {
      this.toastr.error(err.error.message || 'Internal server error', 'Error Message', {
        closeButton: true
      });
    }
  }
}
