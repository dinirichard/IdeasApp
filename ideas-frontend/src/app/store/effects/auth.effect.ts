import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { AuthService } from '@app/services/auth.service';
import {
    MyAction,
    SetInitialUser,
    AuthActionTypes,
    SetCurrentUser,
    LoginUser,
    RegisterUser
} from '../actions/auth.action';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { User } from '@app/models/user';
import { AddError, RemoveError } from '../actions/errors.action';
import { AppState } from '../app-store.module';

@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
    ) { }

    @Effect()
    setInitialUSer$: Observable<Action> = this.action$.pipe(
        ofType<SetInitialUser>(AuthActionTypes.SET_INITIAL_USER),
        tap(() => this.store.dispatch(new RemoveError())),
        mergeMap((action: SetInitialUser) => this.authService.whoami().pipe(
            map((user: User) => new SetCurrentUser(user)),
            catchError(err => of(new AddError(err.error)))
        ))
    );

    @Effect()
    loginUser$: Observable<Action> = this.action$.pipe(
        ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
        tap(() => this.store.dispatch(new RemoveError())),
        mergeMap((action: LoginUser) =>
            this.authService.login(action.payload).pipe(
                map((user: User) => new SetCurrentUser(user)),
                catchError(err => of(new AddError(err.error)))
            ))
    );

    @Effect()
    registerUser$: Observable<Action> = this.action$.pipe(
        ofType<RegisterUser>(AuthActionTypes.REGISTER_USER),
        tap(() => this.store.dispatch(new RemoveError())),
        mergeMap((action: RegisterUser) =>
            this.authService.register(action.payload).pipe(
                map((user: User) => new SetCurrentUser(user)),
                catchError(err => of(new AddError(err.error)))
            ))
    );
}
