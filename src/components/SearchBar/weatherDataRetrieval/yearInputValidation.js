//Expects: 
//A year, in YYYY format, between the oldest available from the APIs, and the current year
//The oldest available year, in YYYY format

//Returns:
//"valid" - the provided input is a valid year
//"old" - the provided year is older than the APIs can provide
//"future" - the provided year is in the future
//"badFormat" - there is another issue with the year
//"empty" - input is an empty string
function validateYearInput(year, oldestYear)
{
    if(year === "")
    {
        return "empty";
    }
    
    if(isFormatIncorrect(year))
    {
        return "badFormat";
    }
    
    //Will return old, future, or valid.
    //If this is within range, then all checks have passed.
    return checkDateRange(year, oldestYear);
}

function isFormatIncorrect(year)
{
    return (year.length != 4 || isNaN(year));
}

//The passed data expects a string, however it must be 
//a numeric value
function checkDateRange(year, oldestYear)
{
    let currentDate = new Date();
    if(parseInt(year) < oldestYear)
    {
        return "old";
    }
    else if (parseInt(year) > parseInt(currentDate.getFullYear()))
    {
        return "future";
    }
    
    return "valid";
}

export default validateYearInput;