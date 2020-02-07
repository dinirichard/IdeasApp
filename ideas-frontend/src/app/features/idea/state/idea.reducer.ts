import { IdeaState } from '.';
import { MyAction, IdeaActions } from './idea.action';
import { toArray } from 'rxjs/operators';

const initialState: IdeaState = {
    ideas: {},
    page: 0,
    loading: false,
    loaded: false,
    selectedIdea: null,
    selectedIdeaComments: null
};

export const ideaReducer: (state: IdeaState, action: MyAction) => IdeaState = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case IdeaActions.LOAD_IDEAS:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.LOAD_IDEA:
            return {
                ...state,
                selectedIdea: action.payload,
                loading: true,
                loaded: false
            };
        case IdeaActions.CREATE_IDEA:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.UPDATE_IDEA:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.DELETE_IDEA:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.CREATE_COMMENT:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.UPVOTE_IDEA:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.DOWNVOTE_IDEA:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.LOAD_IDEA_COMMENTS:
            return { ...state, loading: true, loaded: false };
        case IdeaActions.LOAD_IDEAS_SUCCESS:
            return {
                ...state,
                ideas: action.payload.reduce(
                    (acc, idea) => ({ ...acc, [idea.id]: idea }),
                    state.ideas
                ),
                loading: false,
                loaded: true
            };
        case IdeaActions.LOAD_IDEA_SUCCESS:
            return {
                ...state,
                ideas: action.payload
                    ? { ...state.ideas, [action.payload.id]: action.payload }
                    : state.ideas,
                loading: false,
                loaded: true
            };
        case IdeaActions.LOAD_IDEA_COMMENTS_SUCCESS:
            return {
                ...state,
                selectedIdeaComments: action.payload,
                loading: false,
                loaded: true
            };
        case IdeaActions.CREATE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: { ...state.ideas, [action.payload.id]: action.payload },
                selectedIdea: action.payload.id,
                loading: false,
                loaded: true
            };
        case IdeaActions.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                selectedIdeaComments: [...state.selectedIdeaComments, action.payload],
                loading: false,
                loaded: true
            };
        case IdeaActions.UPDATE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: { ...state.ideas, [action.payload.id]: action.payload },
                selectedIdea: action.payload.id,
                loading: false,
                loaded: true
            };

        case IdeaActions.DELETE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: Object.keys(state.ideas)
                    .filter(key => key !== action.payload)
                    .reduce((acc, key) => ({ ...acc, key: state[key] }), {}),
                loading: false,
                loaded: true
            };
        default:
            return state;
    }
};
