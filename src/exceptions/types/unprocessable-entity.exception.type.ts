import { HttpStatus } from '@nestjs/common';
import { HttpExceptionBody } from './http.exception.type';

type UnprocessableEntityError = {
  field: string;
  rule: string;
  message: string;
};

type UnprocessableEntityData = {
  errors: UnprocessableEntityError[];
};

/**
 * Represents an Unprocessable Entity exception.
 */
export interface UnprocessableEntity extends HttpExceptionBody {
  code: HttpStatus.UNPROCESSABLE_ENTITY;
  data: UnprocessableEntityData;
}
