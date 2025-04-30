/**
 * Converts the given exception name to snake case and returns it in uppercase.
 * @param exceptionName - The name of the exception.
 * @returns The converted exception name in uppercase.
 */
export const httpExceptionType = (exceptionName: string): string => {
  exceptionName = exceptionName
    .split(/\B(?=[A-Z])/)
    .map(word => word.toUpperCase())
    .join('_')

  return exceptionName
}
