import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UseFilters,
    BadRequestException,
    HttpStatus,
} from '@nestjs/common';
import { CustomException } from './custom.exception';
import { AppResponseError } from './api.response';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

interface ResponseBody extends Object {
    statusCode: number;
    message: Array<string>;
    error: string;
}

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        response
            .status(status)
            .json(
                AppResponseError(
                    exception.getResponse().message[0],
                    exception,
                    status,
                ),
            );
    }
}

export function CustomExceptionDecorator() {
    return UseFilters(new HttpExceptionFilter());
}
