import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
//* DTOS
import { CreateUserDto } from './dtos/create-user.dto';
//* SERVICES
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
//* EXCEPTION FILTERS
import { CustomExceptionDecorator } from '../config/http-exception.filter';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('signup')
    @CustomExceptionDecorator()
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.authService.signUp(body);
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        
        return this.authService.login(req.user);
    }
}
