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

@ValidatorConstraint({ name: `PhoneNumberExists`, async: true })
@Injectable()
export class IsPhoneNumberExists implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async validate(value: string, validationArguments?: ValidationArguments) {
        try {
            const users = await this.userRepo.find({
                where: {
                    phone: +value.trim()
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
        return `Phone number already exists in database`;
    }
}

export function PhoneNumberExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'PhoneNumberExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsPhoneNumberExists,
        });
    };
}
