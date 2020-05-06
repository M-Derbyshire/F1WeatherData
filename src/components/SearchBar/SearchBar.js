import React from 'react';
import './SearchBar.css';

function SearchBar()
{
    //The list of tracks brought back from the API for that year.
    //The user can then filter down the search
    let trackFilterOptions = []; //temporary value
    
    //Form is not actually submitting, so the values are just set to the options
    //This will populate the track filter dropdown
    let trackFilterOptionslist = trackFilterOptions.map(
        (opt) => <option key={"trackOption-" + opt} value={opt}>{opt}</option>
    );
    
    return (
        <div className="SearchBar">
            <form id="searchCriteria">
                <div className="inputGroup">
                    <label>Year:</label>
                    <input type="text" id="yearInput" name="yearInput" />
                </div>
                
                <div className="inputGroup">
                    <label>Track Filter:</label>
                    <select id="trackFilterSelector" name="trackFilterSelector" disabled={(trackFilterOptions.length > 0) ? "" : "disabled"}>
                        <option value="all">All Tracks</option>
                        {trackFilterOptionslist}
                    </select>
                </div>
            </form>
        </div>
    );
}
export default SearchBar;