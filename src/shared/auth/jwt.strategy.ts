import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'AUTH0_DOMAIN.well-known/jwks.json',
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: 'AUTH0_AUDIENCE',
            issuer: 'AUTH0_DOMAIN',
            algorithms: ['RS256'],
        });
    }

    validate(payload: any) {
        return payload;
    }
}