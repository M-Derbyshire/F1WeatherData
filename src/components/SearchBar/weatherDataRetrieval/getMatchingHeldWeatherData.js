export default function getMatchingHeldWeatherData(weatherData, year) //exported for tests
{
    let heldMatchingWeatherData = [];
    
    for(let i = 0; i < weatherData.length; i++)
    {
        if(weatherData[i].year === year)
        {
            heldMatchingWeatherData.push(weatherData[i]);
        }
    }
    
    return heldMatchingWeatherData;
}