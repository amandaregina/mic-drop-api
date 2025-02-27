import { httpExceptionType } from 'src/exceptions/utils/http-exception-type';

describe('httpExceptionType', () => {
  it('should convert exception name to uppercase snake case', () => {
    const exceptionName = 'TestException';
    const expectedType = 'TEST_EXCEPTION';

    const result = httpExceptionType(exceptionName);

    expect(result).toBe(expectedType);
  });

  it('should handle exception names with multiple words', () => {
    const exceptionName = 'AnotherTestException';
    const expectedType = 'ANOTHER_TEST_EXCEPTION';

    const result = httpExceptionType(exceptionName);

    expect(result).toBe(expectedType);
  });
});
