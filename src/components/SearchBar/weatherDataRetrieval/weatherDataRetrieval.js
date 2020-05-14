import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';
import getMatchingHeldWeatherData from './getMatchingHeldWeatherData';
import getAPISettings from './seperateDataRetrievers/getAPISettings';
import retrieveF1DataObject from './seperateDataRetrievers/retrieveF1DataObject';
import retrieveWeatherStationID from './seperateDataRetrievers/retrieveWeatherStationID';
import retrieveWeatherByStationAndDate from './seperateDataRetrievers/retrieveWeatherByStationAndDate';
import getErrorDataObject from './getErrorDataObject';

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
        const f1DataOnly = await retrieveF1DataObject(year); //This will return an empty array if it finds no races
        if(f1DataOnly.length === 0)
        {
            setSearchOutput([getErrorDataObject("No race data available for this year.", false)]);
            return;
        }
        
        
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
        setSearchOutput([getErrorDataObject("Error while retrieving weather data - " + e, true)]);
        return;
    }
}