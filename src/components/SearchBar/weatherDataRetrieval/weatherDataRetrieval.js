import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';
import isQuarterValid from './quarterInputValidation';
import getMatchingHeldWeatherData from './getMatchingHeldWeatherData';
import getAPISettings from './seperateDataRetrievers/getAPISettings';
import retrieveF1DataObject from './seperateDataRetrievers/retrieveF1DataObject';
import retrieveWeatherStationID from './seperateDataRetrievers/retrieveWeatherStationID';
import retrieveWeatherByStationDateTime from './seperateDataRetrievers/retrieveWeatherByStationDateTime';
import getErrorDataObject from './getErrorDataObject';

//Requires: the year for the data that is requested; the quarter (1, 2, 3 or 4) of 
//the season for the request; the apiSettings hook;
//state value (or null if not yet set) and set-function; the weatherData 
//hook state value, and its set-function; the set-function for the search
//output state.
export default async function retrieveWeatherData(year, quarter, passedApiSettings, setApiSettings, weatherData, setWeatherData, setSearchOutput)
{
    try
    {
        //Get and validate the API settings.
        let apiSettings = await getAPISettings(passedApiSettings); //If passedApiSettings is already populated, this will just pass it straight back
        setApiSettings(apiSettings); //Finally, keep the loaded settings for future searches
        
        
        //Validate the year input, and alert the user if it isn't valid
        const yearValidationResult = validateYearInput(year, apiSettings.oldest_year_available);
        if(yearValidationResult !== "valid")
        {
            displayInvalidYearAlert(yearValidationResult, year);
            return;
        }
		
		//Validate the quarter input, and alert the user if it isn't valid
        if(!isQuarterValid(quarter))
        {
            alert(`Unfortunately, the given quarter value ("${quarter}") is incorrect.`);
            return;
        }
        
        
        
        //Now we need to check we don't already hold the requested year data.
        const heldMatchingWeatherData = getMatchingHeldWeatherData(weatherData, year);
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
        const f1DataWithStations = []; 
        for(let i = 0; i < f1DataOnly.length; i++)
        {
            //Originally used a map function to do this. However,
            //we were getting 403 forbidden errors from the weather API,
            //so we want to do this in a way where each request is made
            //one at a time.
            
            f1DataWithStations.push({
                ...f1DataOnly[i],
                stationID: await retrieveWeatherStationID(f1DataOnly[i].lat, f1DataOnly[i].long, apiSettings.meteostat_API_key)
            });
        }
        
        let newF1WeatherData = [];
        for(let i = 0; i < f1DataWithStations.length; i++)
        {
            //Originally used a map function to do this. However,
            //we were getting 403 forbidden errors from the weather API,
            //so we want to do this in a way where each request is made
            //one at a time.
            
            //Will return null if there is no weather data found, or if the provided stationID is an empty string.
            //(Returns null instead of an empty object, as that's actually recieved as undefined.)
            const raceWeatherData = await retrieveWeatherByStationDateTime(f1DataWithStations[i].stationID, 
                f1DataWithStations[i].raceDate, f1DataWithStations[i].raceTime, apiSettings.meteostat_API_key);
            
            newF1WeatherData.push({
                ...f1DataWithStations[i],
                weather: (raceWeatherData !== null) ? raceWeatherData : {} //Return empty object if no data
            });
        }
        
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