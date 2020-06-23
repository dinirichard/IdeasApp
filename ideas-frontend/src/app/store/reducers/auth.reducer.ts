import { User } from '@app/models/user';
import { AuthActionTypes } from '../actions/auth.action';
import { MyAction } from '../actions/auth.action';

export interface AuthState {
    user: User | null;
    loading: boolean;
    loaded: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    loaded: false
};

const _authReducer: (state: AuthState, action: MyAction)
    => AuthState = (
        state = initialState,
        action: MyAction,
    ) => {
        switch (action.type) {
            case AuthActionTypes.LOGIN_USER:
                return { ...state, loading: true, loaded: false };
            case AuthActionTypes.REGISTER_USER:
                return { ...state, loading: true, loaded: false };
            case AuthActionTypes.SET_INITIAL_USER:
                return { ...state, loading: true, loaded: false };
            case AuthActionTypes.SET_CURRENT_USER:
                return { ...state, user: action.payload, loading: false, loaded: true };
            default:
                return state;
        }
    };

export function authReducer(state, action) {
    return _authReducer(state, action);
}