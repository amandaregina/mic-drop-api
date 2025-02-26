import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';

/**
 * Represents the body of an HTTP exception.
 */
export type HttpExceptionBody = {
  message: string;
  code: HttpStatus;
  type?: string;
  options?: HttpExceptionOptions;
  data?: unknown;
};
