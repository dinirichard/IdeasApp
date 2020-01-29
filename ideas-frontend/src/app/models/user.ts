import { Idea } from './idea';


export interface User {
    id: string;
    created: Date;
    username: string;
    password: string;
    ideas: Idea[];
    bookmarks: Idea[];
}

export class UserDTO {
    username: string;
    password: string;
}
