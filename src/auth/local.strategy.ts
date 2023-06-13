import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<any> {
        
        const user = this.authService.validateUser(email, password);
        // if validateUser method returns falsy value throw unauthorize exception
        if (!user) {
            
            throw new UnauthorizedException('Unauthorize user');
        }

        return user; // this object has all the properties except password
    }
}
