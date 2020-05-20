import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app-store.module';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { LoadUser } from '../state/user.action';
import { selectUserState } from '../state/user.selector';
import { UserState } from '../state';
import { selectCurrentUser } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: User;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(
      (user) => {
        this.userProfile = user;
        // console.log(this.);
      }
    );
  }

}
