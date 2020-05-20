import { Action } from '@ngrx/store';
import { Idea, IdeaDTO } from '@app/models/idea';
import { CommentDTO, Comment } from '@app/models/comment';

export enum IdeaActions {
    LOAD_IDEAS = '[Idea] Load ideas',
    LOAD_IDEAS_SUCCESS = '[Idea] Load ideas success',

    LOAD_IDEA = '[Idea] Load idea',
    LOAD_IDEA_SUCCESS = '[Idea] Load idea success',

    LOAD_MORE_IDEAS = '[Idea] Load more ideas',
    LOAD_MORE_IDEAS_SUCCESS = '[Idea] Load more ideas success',

    CREATE_IDEA = '[Idea] Create idea',
    CREATE_IDEA_SUCCESS = '[Idea] Create idea success',

    UPDATE_IDEA = '[Idea] Update idea',
    UPDATE_IDEA_SUCCESS = '[Idea] Update idea success',

    DELETE_IDEA = '[Idea] Delete idea',
    DELETE_IDEA_SUCCESS = '[Idea] Delete idea success',

    UPVOTE_IDEA = '[Idea] Upvote idea',
    DOWNVOTE_IDEA = '[Idea] Downvote idea',

    CREATE_COMMENT = '[Idea] Create comment',
    CREATE_COMMENT_SUCCESS = '[Idea] Create comment success',

    LOAD_IDEA_COMMENTS = '[Idea] Load idea comments',
    LOAD_IDEA_COMMENTS_SUCCESS = '[Idea] Load idea comments success',

    LOAD_MORE_COMMENT = '[Idea] Load more comments',
    LOAD_MORE_COMMENTS_SUCCESS = '[Idea] Load more comments success',
}

export class LoadIdeas implements Action {
    readonly type = IdeaActions.LOAD_IDEAS;
}

export class LoadIdeasSuccess implements Action {
    readonly type = IdeaActions.LOAD_IDEAS_SUCCESS;
    constructor(public payload: Idea[]) {}
}

export class LoadMoreIdeas implements Action {
    readonly type = IdeaActions.LOAD_MORE_IDEAS;
    constructor(public page?: number, public currentId?: string) {}
}

export class LoadMoreIdeasSuccess implements Action {
    readonly type = IdeaActions.LOAD_MORE_IDEAS_SUCCESS;
    constructor(public payload: Idea[]) {}
}

export class LoadIdea implements Action {
    readonly type = IdeaActions.LOAD_IDEA;
    constructor(public payload: string) {}
}

export class LoadIdeaSuccess implements Action {
    readonly type = IdeaActions.LOAD_IDEA_SUCCESS;
    constructor(public payload?: Idea) {}
}

export class CreateIdea implements Action {
    readonly type = IdeaActions.CREATE_IDEA;
    constructor(public payload: IdeaDTO) {}
}

export class CreateIdeaSuccess implements Action {
    readonly type = IdeaActions.CREATE_IDEA_SUCCESS;
    constructor(public payload: Idea) {}
}

export class UpdateIdea implements Action {
    readonly type = IdeaActions.UPDATE_IDEA;
    constructor(public payload: Partial<IdeaDTO>) {}
}

export class UpdateIdeaSuccess implements Action {
    readonly type = IdeaActions.UPDATE_IDEA_SUCCESS;
    constructor(public payload: Idea) {}
}

export class DeleteIdea implements Action {
    readonly type = IdeaActions.DELETE_IDEA;
    constructor(public payload: string) {}
}

export class DeleteIdeaSuccess implements Action {
    readonly type = IdeaActions.DELETE_IDEA_SUCCESS;
    constructor(public payload: string) {}
}

export class UpvoteIdea implements Action {
    readonly type = IdeaActions.UPVOTE_IDEA;
    constructor(public payload: string) {}
}

export class DownvoteIdea implements Action {
    readonly type = IdeaActions.DOWNVOTE_IDEA;
    constructor(public payload: string) {}
}

export class CreateComment implements Action {
    readonly type = IdeaActions.CREATE_COMMENT;
    constructor(public payloadid: string, public payload: CommentDTO) {}
}

export class CreateCommentSuccess implements Action {
    readonly type = IdeaActions.CREATE_COMMENT_SUCCESS;
    constructor(public payload: Comment) {}
}

export class LoadIdeaComments implements Action {
    readonly type = IdeaActions.LOAD_IDEA_COMMENTS;
    constructor(public payloadid: string, public page?: string) {}
}

export class LoadIdeaCommentsSuccess implements Action {
    readonly type = IdeaActions.LOAD_IDEA_COMMENTS_SUCCESS;
    constructor(public payload: Comment[]) {}
}

export class LoadMoreComments implements Action {
    readonly type = IdeaActions.LOAD_MORE_COMMENT;
    constructor(public payloadid: string, public page: string) {}
}

export class LoadMoreCommentsSuccess implements Action {
    readonly type = IdeaActions.LOAD_MORE_COMMENTS_SUCCESS;
    constructor(public payload: Comment[]) {}
}

export type MyAction =
    | LoadIdeas
    | LoadIdeasSuccess
    | LoadMoreIdeas
    | LoadMoreIdeasSuccess
    | LoadIdea
    | LoadIdeaSuccess
    | CreateIdea
    | CreateIdeaSuccess
    | UpdateIdea
    | UpdateIdeaSuccess
    | DeleteIdea
    | DeleteIdeaSuccess
    | UpvoteIdea
    | DownvoteIdea
    | CreateComment
    | CreateCommentSuccess
    | LoadIdeaComments
    | LoadIdeaCommentsSuccess
    | LoadMoreComments
    | LoadMoreCommentsSuccess;
