import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { AddError } from './store/actions/errors.action';
import { AuthDTO } from './models/auth';
import { LoginUser, SetInitialUser } from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ideas-App';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(
      // new LoginUser({
      //   username: 'admin',
      //   password: 'admin'
      // } as AuthDTO)
      new SetInitialUser()
    );
  }
}
