import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(data: any) {
        const user = await this.userService.validateUser(data);
        console.log(JSON.stringify(user));
        const payload = { username: user.username, sub: user.id };
        // console.log(JSON.stringify(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
