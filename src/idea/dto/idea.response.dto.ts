import { User } from 'src/user/models/user.model';
import { UserRO } from 'src/user/dto/user.res.dto';

export class IdeaRO {
    id?: string;
    created?: Date;
    updated: Date;
    idea: string;
    description: string;
    author?: UserRO;
}
