import { HttpStatus } from '@nestjs/common'

import { UnprocessableEntityException } from '@/exceptions/unprocessable-entity.exception'
import { httpExceptionType } from '@/exceptions/utils/http-exception-type'

describe('UnprocessableEntityException', () => {
  const message = 'Request validation error'
  const code = HttpStatus.UNPROCESSABLE_ENTITY
  const type = httpExceptionType(UnprocessableEntityException.name)

  it('should create an instance without erros', () => {
    const cause = []

    const exception = new UnprocessableEntityException({
      cause,
    })

    expect(exception).toBeInstanceOf(UnprocessableEntityException)
    expect(exception.message).toBe(message)
    expect(exception.code).toBe(code)
    expect(exception.type).toBe(type)
    expect(exception.cause).toEqual(cause)
  })

  it('should create an instance with erros', () => {
    const cause = [
      {
        field: 'something',
        message: 'String must contain at least 1 character(s)',
        rule: 'too_small',
      },
    ]

    const exception = new UnprocessableEntityException({
      cause,
    })

    expect(exception).toBeInstanceOf(UnprocessableEntityException)
    expect(exception.message).toBe(message)
    expect(exception.code).toBe(code)
    expect(exception.type).toBe(type)
    expect(exception.cause).toEqual(cause)
  })
})
