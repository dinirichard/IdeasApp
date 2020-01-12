import { IsString } from 'class-validator';
import { Idea } from '../interfaces/idea.model';
import { User } from 'src/user/models/user.model';

export class IdeaDTO {
    @IsString()
    idea: string;

    @IsString()
    description: string;
}

