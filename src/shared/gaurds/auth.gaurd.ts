
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { jwtConstants } from '../auth/constants';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MyAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }

        request.user = await this.validateToken(request.headers.authorization);
        console.log(request.user);
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {   // "bearer token"
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];
        try {
            const decode = await jwt.verify(token, jwtConstants.secret);
            return decode;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }


}