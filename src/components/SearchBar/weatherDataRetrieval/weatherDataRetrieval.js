import validateYearInput from './yearInputValidation';
import loadAPISettings from './loadAPISettings';

async function retrieveWeatherData(yearInputID, trackSelectorID, setTrackList)
{
    const year = document.getElementById(yearInputID).value;
    const trackElement = document.getElementById(trackSelectorID); //may return null, if the track list hasn't been generated
    const track = (trackElement === null) ? "all" : trackElement.value;
    
    try
    {
        const apiSettings = await loadAPISettings();
        
        //Validate the year input, and alert the user if it isn't valid
        const validationResult = validateYearInput(year, apiSettings.oldest_year_available);
        
        switch(validationResult)
        {
            //Explanations for all these results can be found in yearInputValidation.js
            case "valid":
                break;
            case "old":
                alert("Sorry, " + year + " is too long ago, and the data is not available.");
                return;
            case "future":
                alert("Sorry, " + year + " is in the future.");
                return;
            case "empty":
                alert("Please provide a year to search for.");
                return;
            default:
                //Either this is a badFormat, or a future bug has returned something else that we can catch here.
                alert("Sorry, " + year + " is not a valid year input. Please use a 4 digit, YYYY format.");
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

export default retrieveWeatherData;