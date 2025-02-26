import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { httpExceptionType } from './utils/http-exception-type';
import { RequestValidationError } from 'src/pipes/types/request-validation.pipe.type';

/**
 * Custom exception class for handling "Unprocessable Entity" errors.
 */
export class UnprocessableEntityException extends HttpException {
  /**
   * The exception message.
   * @example 'Request validation error'
   */
  @ApiProperty({
    description: 'The exception message',
    example: 'Request validation error',
  })
  message: string = 'Request validation error';

  /**
   * The `HttpStatus` code.
   * @example 422
   */
  @ApiProperty({
    description: 'A `HttpStatus` code',
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  code: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;

  /**
   * The exception  type.
   * @example 'UNPROCESSABLE_ENTITY_EXCEPTION'
   */
  @ApiProperty({
    description: 'The exception type',
    example: httpExceptionType(UnprocessableEntityException.name),
  })
  type: string = httpExceptionType(UnprocessableEntityException.name);

  /**
   * The data object containing the request validation errors.
   */
  @ApiProperty({
    description: 'The data object containing the request validation errors',
  })
  data: RequestValidationError[];

  /**
   * Creates an instance of UnprocessableEntityException.
   * @param options - The options for the exception.
   */
  constructor(options?: HttpExceptionOptions) {
    const message = 'Request validation error';
    const code = HttpStatus.UNPROCESSABLE_ENTITY;
    super(message, code, options);
  }
}
