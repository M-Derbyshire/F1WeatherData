import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';
import getAPISettings from './loadAPISettings';

//Requires: the ID of the year input element; the ID of the track selector element; the apiSettings hook
//state (or null if not yet set) and set-function; the function to set the trackList state
export default async function retrieveWeatherData(yearInputID, trackSelectorID, passedApiSettings, setApiSettings, setTrackList)
{
    const year = document.getElementById(yearInputID).value;
    const trackElement = document.getElementById(trackSelectorID); //may return null, if the track list hasn't been generated
    const track = (trackElement === null) ? "all" : trackElement.value;
    
    try
    {
        let apiSettings = await getAPISettings(passedApiSettings);
        setApiSettings(apiSettings); //Keep the loaded settings for future searches
        
        //Validate the year input, and alert the user if it isn't valid
        const validationResult = validateYearInput(year, apiSettings.oldest_year_available);
        if(validationResult !== "valid")
        {
            displayInvalidYearAlert(validationResult, year);
            return;
        }
        
        //Year must be valid if we've reached here, so we can continue
        
    }
    catch(e)
    {
        alert("Error while retrieving weather data - " + e);
        return;
    }
}