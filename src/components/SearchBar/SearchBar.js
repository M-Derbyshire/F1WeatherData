import React from 'react';
import './SearchBar.css';
import retrieveWeatherData from './weatherDataRetrieval/weatherDataRetrieval';
import { useState } from 'react';

// Props: 
// weatherDataState - array of the state and set-state-function for the weatherData
// setSearchOutput - set the array of data that will be displayed after a search/filter
function SearchBar(props)
{
    //The apiSettings, loaded from api_settings.json
    const [apiSettings, setApiSettings] = useState(null);
    
    //The list of tracks, and their weather data, brought back from the 
    //API for that year. The user can then filter down the search, by track
    const [weatherData, setWeatherData] = props.weatherDataState;
    
    //This will populate the track filter dropdown
    const trackFilterOptionslist = weatherData.map(
        (track) => <option key={"trackOption-" + track.raceDate} value={track.circuitId}>{track.circuitName}</option>
    );
    
    //Form inputs names/IDs. Setting here, as re-used in retrieveWeatherData() call.
    const yearInputName = "yearInput";
    const trackFilterInputName = "trackFilterSelector";
    
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
                    <button type="button" onClick={ async () => {
                        retrieveWeatherData(yearInputName, trackFilterInputName, apiSettings, 
                                setApiSettings, weatherData, setWeatherData, props.setSearchOutput);
                        } }>Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;