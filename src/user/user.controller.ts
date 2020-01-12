import { Controller, Post, Get, Body, UseGuards, forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@Controller()
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    //     @Get('api/users')
    //     showAllUsers() {
    //         return this.userService.showAll();
    //     }

    //     @UseGuards(AuthGuard('local'))
    //     @Post('login')
    //     login(@Body() data) {
    //         return this.authService.login(data);
    //     }

    //     @Post('register')
    //     register(@Body() data) {
    //         return this.userService.register(data);
    //     }
}
