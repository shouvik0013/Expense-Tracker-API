import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//* ENTITIES
import { User } from './user.entity';
//* DTOS
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    create(userInfo: CreateUserDto) {
        const user = this.userRepo.create({
            ...userInfo
        });

        return this.userRepo.save(user);
    }
}
