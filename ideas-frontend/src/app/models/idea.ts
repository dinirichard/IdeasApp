import { User } from './user';
import { Comment } from './comment';

export interface Idea {
    id: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
    author?: User;
    upvotes?: number;
    downvotes?: number;
    comments?: Comment[];
}

export interface IdeaDTO {
    idea: string;
    description: string;
}
