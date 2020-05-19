import React from 'react';
import './SearchBar.css';
import retrieveWeatherData from './weatherDataRetrieval/weatherDataRetrieval';
import { useState } from 'react';

// Props: 
// weatherDataState - array of the state and set-state-function for the weatherData
// searchResultState - array of the state and set-state-function for the displayed data after a search/filter
// setIsRetrievingDataState - set-state-function for a bool value, to be made true when the retrieval is running, 
//      and false when it is complete.
function SearchBar(props)
{
    //The apiSettings, loaded from api_settings.json
    const [apiSettings, setApiSettings] = useState(null);
    
    //The list of tracks, and their weather data, brought back from the 
    //API for that year. The user can then filter down the search, by track
    const [weatherData, setWeatherData] = props.weatherDataState;
    
    //The data returned from the last search (not the full list of loaded data)
    const [searchResultData, setSearchResultData] = props.searchResultState;
    
    //Form inputs names/IDs. Setting here, as re-used in retrieveWeatherData() call.
    const yearInputName = "yearInput";
    
    //The closure to call when the search button is pressed
    const runSearch = async () => {
        props.setIsRetrievingDataState(true);
        await retrieveWeatherData(yearInputName, apiSettings, setApiSettings, weatherData, setWeatherData, setSearchResultData);
        props.setIsRetrievingDataState(false);
    }
    
    return (
        <div className="SearchBar">
            <form id="searchCriteria">
                <div className="inputGroup">
                    <label>Enter Year (4 digit format):</label>
                    <input type="text" id={yearInputName} name={yearInputName} size="4" maxLength="4" />
                </div>
                
                <div className="inputGroup">
                    <button type="button" onClick={ runSearch }>Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;