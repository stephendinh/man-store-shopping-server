import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';

export class BaseHttpException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
  static generateError(errorType?: string, message?: string): HttpException {
    let errorMessage: string;
    let statusCode: HttpStatus;
    switch (errorType) {
      case ErrorStatusEnums.INVALID_INPUT: {
        errorMessage = message || 'Invalid input';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      }
      case ErrorStatusEnums.NOT_FOUND: {
        errorMessage = message || 'Not found';
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      case ErrorStatusEnums.FORBIDDEN: {
        errorMessage = message || 'Forbidden';
        statusCode = HttpStatus.FORBIDDEN;
        break;
      }
      case ErrorStatusEnums.UNAUTHORIZED: {
        errorMessage = message || 'Unauthorized';
        statusCode = HttpStatus.UNAUTHORIZED;
        break;
      }
      case ErrorStatusEnums.BAD_REQUEST: {
        errorMessage = message || 'Bad Request';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      }
      default:
        errorMessage = 'Internal server error';
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
    return new BaseHttpException(errorMessage, statusCode);
  }
}
