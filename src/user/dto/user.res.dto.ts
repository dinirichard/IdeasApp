import { Idea } from 'src/idea/interfaces/idea.model';
import { IdeaRO } from 'src/idea/dto/idea.response.dto';

export class UserRO {
    id: string;
    username: string;
    created: Date;
    ideas?: IdeaRO[];
    token?: string;
    bookmarks?: IdeaRO[];
}