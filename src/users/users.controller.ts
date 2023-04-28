import { Controller, Post, Body } from '@nestjs/common';
//* DTOS
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.usersService.create(body);
        return user;
    }
}
