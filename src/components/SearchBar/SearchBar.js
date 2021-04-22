import React from 'react';
import './SearchBar.css';
import retrieveWeatherData from './weatherDataRetrieval/weatherDataRetrieval';
import { useState } from 'react';

// Props: 
// weatherDataState - array of the state and set-state-function for the weatherData
// setSearchResultState - set-state-function for the displayed data after a search/filter
// setIsRetrievingDataState - set-state-function for a bool value, to be made true when the retrieval is running, 
//      and false when it is complete.
function SearchBar(props)
{
    //The apiSettings, loaded from api_settings.json
    const [apiSettings, setApiSettings] = useState(null);
    
    //The list of tracks, and their weather data, brought back from the 
    //API for that year.
    const [weatherData, setWeatherData] = props.weatherDataState;
    
    //The data returned from the last search (not the full list of loaded data)
    const setSearchResultData = props.setSearchResultState;
    
    //Form inputs names/IDs. Setting name here, as used in the rendered output.
    const yearInputName = "yearInput";
	const quarterInputName = "quarterInput";
    
    //The closure to call when the search button is pressed
    const runSearch = async () => {
        props.setIsRetrievingDataState(true);
		const year = document.getElementById(yearInputName).value;
		const quarter = parseInt(document.getElementById(quarterInputName).value);
        await retrieveWeatherData(year, quarter, apiSettings, setApiSettings, weatherData, setWeatherData, setSearchResultData);
        props.setIsRetrievingDataState(false);
    }
    
    return (
        <div className="SearchBar">
            <form id="searchCriteria" onSubmit={(e) => { e.preventDefault(); runSearch(); }}>
                <div className="inputGroup">
                    <label>Enter Year:</label>
                    <input type="text" id={yearInputName} name={yearInputName} size="4" maxLength="4" />
                </div>
				
				<div className="inputGroup">
                    <label>Season Quarter:</label>
                    <select id={quarterInputName} name={quarterInputName}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
                </div>
                
                <div className="inputGroup">
                    <button type="submit">Get Weather Data</button>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;