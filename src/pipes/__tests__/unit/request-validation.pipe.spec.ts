import { z } from 'zod'

import { UnprocessableEntityException } from '@/exceptions/unprocessable-entity.exception'
import { RequestValidationPipe } from '@/pipes/request-validation.pipe'

describe('RequestValidationPipe', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We don't need to specify the type here as it's inferred
  let zodSchemaValidationPipe: RequestValidationPipe<any>

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  beforeEach(() => {
    zodSchemaValidationPipe = new RequestValidationPipe(schema)
  })

  it('should correctly validate the input data', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
    }
    expect(zodSchemaValidationPipe.transform(data)).toEqual(data)
  })

  it('should throw an UnprocessableEntityException for invalid input data', () => {
    const data = {
      name: 'John Doe',
      email: '',
    }

    try {
      zodSchemaValidationPipe.transform(data)
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
  })
})
