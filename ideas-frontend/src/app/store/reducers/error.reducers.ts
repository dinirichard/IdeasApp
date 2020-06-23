import { ErrorActionTypes } from '@app/store/actions/errors.action';
import { MyAction } from '../actions/errors.action';

export interface ErrorState {
    error: any;
}

const initialState: ErrorState = {
    error: null
};

const _errorReducer: (state: ErrorState, action: MyAction)
    => ErrorState = (
        state = initialState,
        action: MyAction
    ) => {
        switch (action.type) {
            case ErrorActionTypes.ADD_ERROR:
                return { ...state, error: action.payload };
            case ErrorActionTypes.REMOVE_ERROR:
                return { ...state, error: null };

            default:
                return state;
        }
    };


export function errorReducer(state, action) {
    return _errorReducer(state, action);
}
