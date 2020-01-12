import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MyAuthGuard } from './shared/gaurds/auth.gaurd';
import { UserService } from './user/user.service';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(new MyAuthGuard())
  @Get('api/users')
  showAllUsers(@User('sub') user) {
    console.log(user);
    return this.userService.showAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  login(@Body() data) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data) {
    return this.userService.register(data);
  }
}
