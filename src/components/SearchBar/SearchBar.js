import React from 'react';
import './SearchBar.css';
import retrieveWeatherData from './weatherDataRetrieval/weatherDataRetrieval';


function SearchBar()
{
    //The list of tracks, and their weather data, brought back from the 
    //API for that year. The user can then filter down the search, by track
    const tracks = []; //temporary value
    
    //Form is not actually submitting, so the values are just set to the options
    //This will populate the track filter dropdown
    const trackFilterOptionslist = tracks.map(
        (track) => <option key={"trackOption-" + track} value={track}>{track}</option>
    );
    
    return (
        <div className="SearchBar">
            <form id="searchCriteria">
                <div className="inputGroup">
                    <label>Year:</label>
                    <input type="text" id="yearInput" name="yearInput" />
                </div>
                
                {tracks.length > 0 && //We only want to display this if there are tracks available
                    <div className="inputGroup">
                        <label>Track Filter:</label>
                        <select id="trackFilterSelector" name="trackFilterSelector">
                            <option value="all">All Tracks</option>
                            {trackFilterOptionslist}
                        </select>
                    </div>
                }
                
                <div className="inputGroup">
                    <button type="button" onClick={() => retrieveWeatherData("yearInput", "trackFilterSelector")}>Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;