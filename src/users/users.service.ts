import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from 'util';
//* ENTITIES
import { User } from './user.entity';
//* DTOS
import { CreateUserDto } from './dtos/create-user.dto';
//* Service responses
import {
    AppResponseSuccess,
    AppResponseError,
    FunctionSuccess,
    FunctionError,
    AppResponseType
} from '../config/api.response';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async create(userInfo: CreateUserDto) {
        

        const user = this.userRepo.create({
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName ?? '',
            middleName: userInfo.middleName ?? '',
            gender: userInfo.gender,
            password: userInfo.password,
            phone: userInfo.phone
        });

        return this.userRepo.save(user);
    }

    async findByEmail(email: string): Promise<User[] | null>  {
        try {
            const users = await this.userRepo.find({
                where: {
                    email
                }
            });

            return users;
        } catch (error) {
            return null;
        }
    }

    async findOneByEmail(email: string): Promise<User|null> {
        try {
            const [user] = await this.userRepo.find({
                where: {
                    email: email
                }
            });

            return user;
        } catch (error) {
            return null;
        }
    }
}
