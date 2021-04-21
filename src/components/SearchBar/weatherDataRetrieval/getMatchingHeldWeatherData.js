export default function getMatchingHeldWeatherData(weatherData, year, quarter = 1) //exported for tests
{
    let heldMatchingWeatherData = [];
    
    for(let i = 0; i < weatherData.length; i++)
    {
        if(weatherData[i].year === year && weatherData[i].quarter === quarter)
        {
            heldMatchingWeatherData.push(weatherData[i]);
        }
    }
    
    return heldMatchingWeatherData;
}