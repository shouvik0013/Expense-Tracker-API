import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'blablabaioue245'
        })
    }

    async validate(payload: any) {
        return {email: payload.email}
    }
}