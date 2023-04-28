import { IsString, IsEmail, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
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
    email: string;

    @IsString()
    password: string;


    @IsEnum(Gender)
    gender: Gender;

    @IsPhoneNumber('IN')
    phone: number;
}