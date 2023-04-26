import { HttpStatus, HttpException } from "@nestjs/common";

export interface AppResponseType {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
  statusCode: number
}

export const AppResponseSuccess = (
  message = 'Response',
  data = null,
  status = HttpStatus.OK,
): AppResponseType => {
  return {
    success: true,
    message,
    data,
    statusCode: status
  }
}

export const AppResponseError = (
  message = 'Response',
  data = null,
  status = HttpStatus.INTERNAL_SERVER_ERROR,
): AppResponseType => {
    /*throw new HttpException({
      success: false,
      message,
      error: data,
      statusCode: status
    }, status);*/
  return {
    success: false,
    message,
    error: data,
    statusCode: status
  }
}

/*export const HttpResponseError = (err: any) => {
    const message = err.response && err.response.message || err.message || 'Something went wrong!';
    const data = err.response && err.response.data || null;
    const status = err.response && err.response.statusCode || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException({
      success: false,
      message,
      error: data,
      statusCode: status
    }, status);
}
*/

export const WebResponse = (message, data={}, success=true, statusCode=200) => {
  return {
    web: true,
    message,
    data,
    success,
    statusCode
  }
}

export const FunctionSuccess = (message = 'Success', data = null, statusCode = 0): AppResponseType => {
  return {
    success: true,
    message,
    error: null,
    data,
    statusCode,
  }
}

export const FunctionError = (message = 'Error', error = null, statusCode = -1): AppResponseType => {
  return {
    success: false,
    message,
    error,
    data: null,
    statusCode,
  }
}