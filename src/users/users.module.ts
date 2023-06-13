import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
//* MODULES
import {AuthModule} from '../auth/auth.module';
//* ENTITIES
import { User } from './user.entity';
//* INJECTABLES
import { IsEmailAlreadyExists } from './decorators/is-email-exist.decorator';
import { IsPhoneNumberExists } from './decorators/is-phone-exist.decorator';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService, IsEmailAlreadyExists, IsPhoneNumberExists],
    exports: [UsersService]
})
export class UsersModule {}
