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
    
    //The data returned from the last search/filter (not the full list of loaded data)
    const [searchResultData, setSearchResultData] = props.searchResultState;
    
    //This will populate the track filter dropdown
    const trackFilterOptionslist = searchResultData.map(
        (track) => <option key={"trackOption-" + track.raceDate} value={track.circuitId}>{track.circuitName}</option>
    );
    
    //Form inputs names/IDs. Setting here, as re-used in retrieveWeatherData() call.
    const yearInputName = "yearInput";
    const trackFilterInputName = "trackFilterSelector";
    
    //The closure to call when the search button is pressed
    const runSearch = async () => {
        props.setIsRetrievingDataState(true);
        await retrieveWeatherData(yearInputName, trackFilterInputName, apiSettings, setApiSettings, weatherData, setWeatherData, setSearchResultData);
        props.setIsRetrievingDataState(false);
    }
    
    return (
        <div className="SearchBar">
            <form id="searchCriteria">
                <div className="inputGroup">
                    <label>Year (4 digit format):</label>
                    <input type="text" id={yearInputName} name={yearInputName} />
                </div>
                
                {trackFilterOptionslist.length > 0 && //We only want to display this if there are tracks available
                    <div className="inputGroup">
                        <label>Track Filter:</label>
                        <select id={trackFilterInputName} name={trackFilterInputName}>
                            <option value="all">All Tracks</option>
                            {trackFilterOptionslist}
                        </select>
                    </div>
                }
                
                <div className="inputGroup">
                    <button type="button" onClick={ runSearch }>Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;