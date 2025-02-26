import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { httpExceptionType } from '@/exceptions/utils/http-exception-type'

/**
 * Custom exception class for handling "Not Found" errors.
 */
export class NotFoundException extends HttpException {
  /**
   * The exception message.
   * @example 'Not Found'
   */
  @ApiProperty({
    description: 'The exception message',
    example: 'Not Found',
  })
  message: string

  /**
   * The `HttpStatus` code.
   * @example 422
   */
  @ApiProperty({
    description: 'A `HttpStatus` code',
    example: HttpStatus.NOT_FOUND,
  })
  code: HttpStatus = HttpStatus.NOT_FOUND

  /**
   * The exception  type.
   * @example 'UNPROCESSABLE_ENTITY_EXCEPTION'
   */
  @ApiProperty({
    description: 'The exception type',
    example: httpExceptionType(NotFoundException.name),
  })
  type: string = httpExceptionType(NotFoundException.name)

  /**
   * Creates an instance of NotFoundException.
   * @param message - The exception message.
   * @param options - The options for the exception.
   */
  constructor(message?: string, options?: HttpExceptionOptions) {
    const code = HttpStatus.NOT_FOUND
    super(message, code, options)
    this.message = message || 'Not Found'
  }
}
