import getErrorDataObject from './getErrorDataObject';

test("getErrorDataObject will return an error object with the requested data", () => {
    const error = "Test error";
    const isException = true;
    
    const expectedResult = {
        error,
        isException
    };
    
    const result = getErrorDataObject(error, isException);
    
    expect(result).toStrictEqual(expectedResult);
});