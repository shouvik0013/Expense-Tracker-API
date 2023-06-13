import { Injectable, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../users/user.entity';

//* DTO
import { CreateUserDto } from '../users/dtos/create-user.dto';
//* Service response
import {
    FunctionSuccess,
    FunctionError,
    AppResponseSuccess,
    AppResponseError,
} from '../config/api.response';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(userInfo: CreateUserDto) {
        try {
            const users = await this.usersService.findByEmail(userInfo.email);
            // if there is any user, send error
            if (users.length) {
                return FunctionError(
                    'Email already in use',
                    {},
                    StatusCodes.BAD_REQUEST,
                );
            }

            const password = userInfo.password;

            // generating unique salt for each new user
            const salt = randomBytes(32).toString('hex');
            // generating hash using computed salt
            const hash = (await scrypt(password, salt, 32)) as Buffer;
            // generating hashed password along with salt which will be stored in db
            const hashedPasswordWithSalt = salt + '.' + hash.toString('hex');

            // updating the password property inside userInfo object
            userInfo.password = hashedPasswordWithSalt;

            // save new user
            const user = await this.usersService.create(userInfo);

            // return newly created user
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        // if no user found return null
        if (!user) {
            return null;
        }

        // compare the password and stored hashed password
        const [storedSalt, storedHashedPassword] = user.password.split('.');
        // creating hashed password using stored hash
        const hashedPassword = (await scrypt(
            password,
            storedSalt,
            32,
        )) as Buffer;
        // comparing the two passwords
        if (storedHashedPassword !== hashedPassword.toString('hex')) {
            // if passwords dont match return null
            return null;
        }

        // extracting the password property from user object
        const { password: userPassword, ...result } = user;

        return result; // this result will be attached to the request object
    }

    // on successfull login issue a jwt access token
    async login(user: Partial<User>) {
        const payload = { email: user.email };
        // return { access_token: this.jwtService.sign(payload) };
        return AppResponseSuccess('Successfully logged in', {
            token: this.jwtService.sign(payload)
        }, HttpStatus.OK)
    }
}
