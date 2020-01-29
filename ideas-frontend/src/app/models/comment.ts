import { User } from './user';
import { Idea } from './idea';

export class Comment {
    id: string;
    created: Date;
    text: string;
    author?: User;
    idea?: Idea;
}

export class CommentDTO {
    text: string;
}
