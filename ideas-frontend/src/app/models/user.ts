import { Idea } from './idea';


export interface User {
    id: string;
    username: string;
    created: Date;
    access_token?: string;
    ideas?: Idea[];
    bookmarks?: Idea[];
}

export class UserDTO {
    username: string;
    password: string;
}
