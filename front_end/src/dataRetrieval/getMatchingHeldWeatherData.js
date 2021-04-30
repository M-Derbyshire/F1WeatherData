export default function getMatchingHeldWeatherData(weatherData, year, quarter = 1) //exported for tests
{
    let heldMatchingWeatherData = [];
    
	//weatherData is a collection, not an array, so not using filter
    for(let i = 0; i < weatherData.length; i++)
    {
        if(weatherData[i].year === year && weatherData[i].quarter === quarter)
        {
            heldMatchingWeatherData.push(weatherData[i]);
        }
    }
    
    return heldMatchingWeatherData;
}