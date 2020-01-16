import { IsString, IsNotEmpty } from 'class-validator';

export class CommentDTO {

    @IsNotEmpty()
    @IsString()
    text: string;
}