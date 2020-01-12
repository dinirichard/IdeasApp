
import { ConfigService } from 'nestjs-dotenv';


export const jwtConstants = {
    secret: 'secretKey',
};

export const sec = process.env.SECRET;
