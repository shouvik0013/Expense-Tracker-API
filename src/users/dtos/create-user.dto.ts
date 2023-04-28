import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    IsPhoneNumber,
    Validate,
} from 'class-validator';
import {
    IsEmailAlreadyExists,
    EmailExists,
} from '../decorators/is-email-exist.decorator';
import { PhoneNumberExists, IsPhoneNumberExists } from '../decorators/is-phone-exist.decorator';
import { Gender } from '../user.entity';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    @EmailExists()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsPhoneNumber('IN')
    @Validate(IsPhoneNumberExists)
    phone: number;
}
