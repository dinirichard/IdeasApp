import { Idea } from 'src/idea/interfaces/idea.model';
import { User } from 'src/user/models/user.model';
import { UserRO } from 'src/user/dto/user.res.dto';
import { IdeaRO } from 'src/idea/dto/idea.response.dto';

export class CommentRO {
    id: string;
    created: Date;
    text: string;
    author?: UserRO;
    idea?: IdeaRO;
}
