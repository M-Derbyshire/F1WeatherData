//The date is in a YYYY-MM-DD format.
//The start time is in a HH:MM:SS format (possibly ending with a 'Z')
//Both time and date are UTC.
export default async function retrieveWeatherByStationDateTime(stationID, raceDate, raceStartTime, apiKey)
{
    //If given a blank string as the weatherID (so no weatherID found), return null
    if(stationID === "") return null;
    
    if(raceStartTime === "unknown")
    {
        raceStartTime = "12:00:00"; //If the time has not been provided, set to midday
    }
    
    //race start time is UTC, so may (and should, if from the Ergast F1 API) end with a "Z".
    //If so, remove the Z.
    if(raceStartTime.charAt(raceStartTime.length - 1).toUpperCase() === 'Z')
    {
        raceStartTime = raceStartTime.slice(0, -1);
    }
    
    
    
    try
    {
        //This will return data for the provided date.
        let response = await fetch(`https://api.meteostat.net/v2/stations/hourly?station=${stationID}&start=${raceDate}&end=${raceDate}&time_format=Y-m-d%20H:i`, {
			headers: {
				'x-api-key': apiKey
			}
		});
        
        if(response.ok)
        {
            const weatherData = await response.json();
            
            //If no records are returned, or no record for this hour is found, return null.
            //The display components will need to handle the data not being available.
            //If we return an empty object from here, it will just be recieved as undefined, so returning null.
            //If the data for the hour is available, return that object
            if(!weatherData.data || weatherData.data.length === 0)
            {
                return null;
            }
            else
            {
				//We will need to find the record for hour within which the race started.
				//E.g. a race starting at 13:34 will bring back the weather data for 13:00.
				const raceHourSearchString = raceDate + " " + raceStartTime.substring(0, 2) + ":00:00";
				const requestedHoursData = weatherData.data.filter(w => w.time === raceHourSearchString);
				
				if(requestedHoursData.length === 0) return null;
				
                //This should only have one result, but if some strange case means there's more,
                //We are able to handle it.
                return requestedHoursData[0];
            }
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(e)
    {
        throw Error("Error while fetching weather data: " + e.message);
    }
}