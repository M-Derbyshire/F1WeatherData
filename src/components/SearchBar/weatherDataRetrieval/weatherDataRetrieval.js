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
        const f1DataOnly = retrieveF1DataObject(year);
        
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
    let response = await fetch(`http://ergast.com/api/f1/${year}/races.json`);
    
    if(response.ok)
    {
        try
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
        catch(e)
        {
            throw Error("Error while parsing F1 data: " + err);
        }
    }
    else
    {
        throw Error("Error while fetching F1 Data: " + response.statusText);
    }
}