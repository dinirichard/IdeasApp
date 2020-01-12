import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/shared/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/auth/constants';
import { IdeaSchema } from 'src/idea/interfaces/idea.model';

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Idea', schema: IdeaSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule { }
