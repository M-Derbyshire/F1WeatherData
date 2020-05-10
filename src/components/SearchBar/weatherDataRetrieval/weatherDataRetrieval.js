import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';
import getAPISettings, { getMissingAPISettings } from './loadAPISettings';

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
        let missingSettings = getMissingAPISettings(apiSettings); //Are any settings missing?
        if(missingSettings.length > 0) 
        {
            // Spaces wouldn't be added after commas with .toString()
            throw Error("Missing API Settings: " + missingSettings.join(", ") + ".");
        }
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