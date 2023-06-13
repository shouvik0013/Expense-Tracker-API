import { Module, forwardRef } from '@nestjs/common';
//* MODULES
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.register({
            secret: 'blablabaioue245',
            signOptions: {
                expiresIn: '60s',
            },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        LocalAuthGuard,
        JwtAuthGuard,
    ],
    exports: [AuthService, LocalAuthGuard, JwtAuthGuard],
})
export class AuthModule {}
