import { Controller, Post, Body } from '@nestjs/common';
//* DTOS
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
//* EXCEPTION FILTERS
import { CustomExceptionDecorator} from '../config/http-exception.filter';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @CustomExceptionDecorator()
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.usersService.create(body);
        return user;
    }
}
