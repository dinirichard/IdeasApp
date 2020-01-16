import { UserRO } from 'src/user/dto/user.res.dto';
import { CommentRO } from 'src/comment/dto/comment.res.dto';

export class IdeaRO {
    id?: string;
    created?: Date;
    updated: Date;
    idea: string;
    description: string;
    author?: UserRO;
    upvotes?: number;
    downvotes?: number;
    comments?: CommentRO[];
}
