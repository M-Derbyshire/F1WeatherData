export default function getMatchingHeldWeatherData(weatherData, year, track) //exported for tests
{
    let heldMatchingWeatherData = [];
    
    for(let i = 0; i < weatherData.length; i++)
    {
        if(weatherData[i].year === year && (track === "all" || weatherData[i].circuitId === track))
        {
            heldMatchingWeatherData.push(weatherData[i]);
        }
    }
    
    return heldMatchingWeatherData;
}