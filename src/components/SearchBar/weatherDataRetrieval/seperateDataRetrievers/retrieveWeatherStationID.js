export default async function retrieveWeatherStationID(lat, long, apiKey)
{
    try
    {
        //We are limiting the station list to 1 result, as the api provides them in order of distance,
        //so the first will be the closest.
        let response = await fetch(`https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${long}&limit=1&key=${apiKey}`);
        
        if(response.ok)
        {
            const stationData = await response.json();
            
            //We should always get a result, but just in case, return an empty string
            return (stationData.data.length === 0 ) ? "" : stationData.data[0].id;
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(e)
    {
        throw Error("Error while fetching weather station data: " + e);
    }
}