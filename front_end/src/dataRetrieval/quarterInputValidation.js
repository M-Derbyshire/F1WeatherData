//Expects: 
//An integer, between 1 and 4.

//Returns:
//A boolean
export default function isQuarterValid(quarter)
{
	return (Number.isInteger(quarter) && quarter > 0 && quarter < 5);
}