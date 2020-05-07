import React from 'react';
import './SearchBar.css';
import retrieveWeatherData from './weatherDataRetrieval/weatherDataRetrieval';
import { useState } from 'react';


function SearchBar()
{
    //The apiSettings, loaded from api_settings.json
    const [apiSettings, setApiSettings] = useState(null);
    
    //The list of tracks, and their weather data, brought back from the 
    //API for that year. The user can then filter down the search, by track
    const [tracks, setTracks] = useState([]); //temporary value
    
    //Form is not actually submitting, so the values are just set to the options
    //This will populate the track filter dropdown
    const trackFilterOptionslist = tracks.map(
        (track) => <option key={"trackOption-" + track} value={track}>{track}</option>
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
                
                {tracks.length > 0 && //We only want to display this if there are tracks available
                    <div className="inputGroup">
                        <label>Track Filter:</label>
                        <select id={trackFilterInputName} name={trackFilterInputName}>
                            <option value="all">All Tracks</option>
                            {trackFilterOptionslist}
                        </select>
                    </div>
                }
                
                <div className="inputGroup">
                    <button type="button" onClick={() => retrieveWeatherData(yearInputName, trackFilterInputName, apiSettings, setApiSettings, setTracks)}>Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;