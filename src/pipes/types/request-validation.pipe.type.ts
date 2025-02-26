import z from 'zod'

export type RequestValidationError = {
  field: string
  rule: z.ZodIssueCode
  message: string
}
