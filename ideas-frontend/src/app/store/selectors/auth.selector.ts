import { createSelector } from '@ngrx/store';

import { AppState, } from '../app-store.module';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;
export const selectCurrentUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);
