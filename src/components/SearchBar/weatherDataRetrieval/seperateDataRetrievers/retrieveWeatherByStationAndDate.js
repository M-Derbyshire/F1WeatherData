//The date is in a YYYY-MM-DD format.
export default async function retrieveWeatherByStationAndDate(stationID, raceDate, apiKey)
{
    try
    {
        //This will return data for the provided date.
        let response = await fetch(`https://api.meteostat.net/v1/history/daily?station=${stationID}&start=${raceDate}&end=${raceDate}&key=${apiKey}`);
        
        if(response.ok)
        {
            const weatherData = await response.json();
            
            //If no record is found, return null.
            //The display components will need to handle the data not being available.
            //If we return an empty object from here, it will just be recieved as undefined, so returning null.
            return (weatherData.data.length === 0) ? null : weatherData.data[0];
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(e)
    {
        throw Error("Error while fetching weather data: " + e);
    }
}