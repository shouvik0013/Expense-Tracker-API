import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// each guard should be part of DI system
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
