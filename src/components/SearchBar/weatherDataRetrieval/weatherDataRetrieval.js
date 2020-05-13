import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';
import getAPISettings from './loadAPISettings';

//Requires: the ID of the year input element; the ID of the track selector element; the apiSettings hook
//state (or null if not yet set) and set-function; the function to set the trackList state
export default async function retrieveWeatherData(yearInputID, trackSelectorID, passedApiSettings, setApiSettings, weatherData, setWeatherData, setSearchOutput)
{
    const year = document.getElementById(yearInputID).value;
    const trackElement = document.getElementById(trackSelectorID); //may return null, if the track list hasn't been generated
    const track = (trackElement === null) ? "all" : trackElement.value;
    
    try
    {
        //Get and validate the API settings.
        let apiSettings = await getAPISettings(passedApiSettings); //If passedApiSettings is already populated, this will just pass it straight back
        setApiSettings(apiSettings); //Finally, keep the loaded settings for future searches
        
        
        //Validate the year input, and alert the user if it isn't valid
        const validationResult = validateYearInput(year, apiSettings.oldest_year_available);
        if(validationResult !== "valid")
        {
            displayInvalidYearAlert(validationResult, year);
            return;
        }
        
        
        
        //Now we need to check we don't already hold the requested year data.
        const heldMatchingWeatherData = getMatchingHeldWeatherData(weatherData, year, track);
        if(heldMatchingWeatherData.length > 0)
        {
            setSearchOutput(heldMatchingWeatherData);
            return;
        }
        
        //If not already held, we need to get the data, and then add it to both the
        //weatherData state, and the searchOutput state.
        const f1DataOnly = await retrieveF1DataObject(year);
        
        //Even though tracks can be used multiple times in a season,
        //there may be a newer weather station part way through the
        //year, so we are checking on every race's record.
        const f1DataWithStations = await Promise.all(f1DataOnly.map(async (race) => {
            return {
                ...race,
                stationID: await retrieveWeatherStationID(race.lat, race.long, apiSettings.meteostat_API_key)
            };
        }));
        
        const newF1WeatherData = await Promise.all(f1DataWithStations.map(async (race) => {
            
            //Will return null if there is no weather data found.
            //(Returns null instead of an empty object, as that's actually recieved as undefined.)
            const raceWeatherData = await retrieveWeatherByStationAndDate(race.stationID, race.raceDate, apiSettings.meteostat_API_key);
            
            return {
                ...race,
                weather: (raceWeatherData !== null) ? raceWeatherData : {} //Return empty object if no data
            }
        }));
        
        //Finally, set the weatherData and searchOutput
        setWeatherData([
            ...weatherData,
            ...newF1WeatherData
        ]);
        
        setSearchOutput(newF1WeatherData);
    }
    catch(e)
    {
        alert("Error while retrieving weather data - " + e);
        return;
    }
}








export function getMatchingHeldWeatherData(weatherData, year, track) //exported for tests
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






export async function retrieveF1DataObject(year)
{
    try
    {
        let response = await fetch(`http://ergast.com/api/f1/${year}/races.json`);
        
        if(response.ok)
        {
            let allF1Data = await response.json();
    
            //Don't need all data, just certain elements
            let requiredF1Data = allF1Data.MRData.RaceTable.Races.map((race) => {
                return {
                    year: year,
                    circuitId: race.Circuit.circuitId,
                    circuitName: race.Circuit.circuitName,
                    raceName: race.raceName,
                    round: race.round,
                    locality: race.Circuit.Location.locality,
                    country: race.Circuit.Location.country,
                    lat: race.Circuit.Location.lat,
                    long: race.Circuit.Location.long,
                    raceDate: race.date,
                    raceTime: race.time //Returned as UTC, so has 'Z' suffix
                };
            });
            
            return requiredF1Data;
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(e)
    {
        throw Error("Error while fetching F1 data: " + e);
    }
}






export async function retrieveWeatherStationID(lat, long, apiKey)
{
    try
    {
        //We are limiting the station list to 1 result, as the api provides them in order of distance,
        //so the first will be the closest.
        let response = await fetch(`https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${long}&limit=1&key=${apiKey}`);
        
        if(response.ok)
        {
            const stationData = await response.json();
            return stationData.data[0].id;
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



//The date is in a YYYY-MM-DD format.
export async function retrieveWeatherByStationAndDate(stationID, raceDate, apiKey)
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