//Exceptions can be given a different error color to something else,
//such as their being no F1 data returned
export default function getErrorDataObject(message, isException)
{
    return {
        error: message,
        isException,
    };
}