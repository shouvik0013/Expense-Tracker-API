import { HttpException } from '@nestjs/common';
import { AppResponseType } from './api.response';
export class CustomException extends HttpException implements AppResponseType {
  constructor(
    public success: boolean,
    public message: string,
    public error: {},
    public statusCode: number,
  ) {
    super({success, message, error, statusCode}, statusCode);
  }
}
