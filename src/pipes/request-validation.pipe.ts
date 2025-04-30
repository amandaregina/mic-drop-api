import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SafeParseError, z, ZodType } from 'zod';
import { RequestValidationError } from './types/request-validation.pipe.type';

@Injectable()
export class RequestValidationPipe<T extends ZodType> implements PipeTransform {
  /**
   * Creates an instance of RequestValidationPipe.
   * @param {z.infer<T>} schema - The Zod schema to validate against.
   */
  constructor(private schema: z.infer<T>) {}

  /**
   * Transforms the input value by validating it against the Zod schema.
   * @param {z.infer<T>} value - The value to be validated.
   * @returns {z.infer<T>} - The validated value.
   * @throws {UnprocessableEntityException} - If the value fails validation, an exception is thrown with the validation errors.
   */
  transform(value: z.infer<T>): z.infer<T> {
    const result = this.schema.safeParse(value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We know the value is safe to return
    if (result.success) return result.data as z.infer<T>;
    const requestValidationErrors: RequestValidationError[] = (
      result as SafeParseError<z.infer<T>>
    ).error.errors.flatMap(({ path, message, code }) => {
      const field = path.join('.');
      const rule = code;

      return {
        field,
        rule,
        message,
      };
    });
    throw new UnprocessableEntityException({
      cause: requestValidationErrors,
    });
  }
}
