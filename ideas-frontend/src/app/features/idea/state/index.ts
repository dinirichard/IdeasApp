
import { Idea } from '@app/models/idea';
import { Entity } from '@app/models/entity';
import * as Store from '@app/store/app-store.module';
import { Comment } from '@app/models/comment';

export interface IdeaState {
    ideas: Entity<Idea>;
    page: number;
    loading: boolean;
    loaded: boolean;
    selectedIdea?: string;
    selectedIdeaComments?: Comment[];
}

export interface AppState extends Store.AppState {
    ideas: IdeaState;
}

export * from './idea.action';
export * from './idea.effects';
export * from './idea.reducer';
export * from './idea.selector';
