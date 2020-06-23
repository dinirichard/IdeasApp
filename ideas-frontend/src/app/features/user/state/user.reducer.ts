import { UserState } from '@app/features/user/state';
import { UserActions, MyAction } from '@app/features/user/state/user.action';

const initialState: UserState = {
    loading: false,
    loaded: false,
    users: [],
    page: 0
};

export const _userReducer: (state: UserState, action: MyAction) => UserState = (
    state: UserState = initialState,
    action: MyAction
) => {
    switch (action.type) {
        case UserActions.LOAD_USERS: {
            const { page } = state;
            return { ...state, page: page + 1, loading: true, loaded: false };
        }
        case UserActions.LOAD_USER: {
            return { ...state, loading: true, loaded: false };
        }
        case UserActions.LOAD_USERS_SUCCESS: {
            const users = action.payload;
            return { ...state, users, loading: false, loaded: true };
        }
        default:
            return state;
    }
};

export function userReducer(state, action) {
    return _userReducer(state, action);
}

