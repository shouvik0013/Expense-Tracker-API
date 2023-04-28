import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';

@ValidatorConstraint({ name: `EmailExists`, async: true })
@Injectable()
export class IsEmailAlreadyExists implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async validate(value: string, validationArguments?: ValidationArguments) {
        try {
            const users = await this.userRepo.find({
                where: {
                    email: value,
                },
            });

            if (users.length > 0) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `Email ID already in use.`;
    }
}

export function EmailExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'EmailExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsEmailAlreadyExists,
        });
    };
}
