import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ResultContainer from '../ResultContainer/ResultContainer';
import RaceWeatherResult from '../RaceWeatherResult/RaceWeatherResult';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DataRetrievingMessage from '../DataRetrievingMessage/DataRetrievingMessage';

function WeatherSearch(props)
{
	const weatherResultsStates = props.weatherResultsStates;
	const isRetrievingData = weatherResultsStates.isRetrievingDataState[0];
	const searchResultData = weatherResultsStates.searchResultDataState[0];
	
	return (
		<div className="WeatherSearch">
			<SearchBar 
				weatherDataState={weatherResultsStates.weatherDataState} 
				setSearchResultState={weatherResultsStates.searchResultDataState[1]} 
				setIsRetrievingDataState={weatherResultsStates.isRetrievingDataState[1]}
				apiSettingsState={props.apiSettingsState}
			/>

			<ResultContainer>
				{
					//If we are currently retrieving data, display a message to show this
					isRetrievingData && <DataRetrievingMessage />
				}

				{/* If we are not currently retrieving any data, display the searchOutput (if there's any to show) */}
				{!isRetrievingData && searchResultData.map((raceData, index) => {
						
						//Results of the search (or an ErrorMessage component, if search returns an error message object)
						if(raceData.hasOwnProperty("error") && raceData.hasOwnProperty("isException"))
						{
							return (
							<ErrorMessage key={"error-" + index} error={raceData.error} isException={raceData.isException} />
							);
						}
						else
						{
							return (
							<RaceWeatherResult key={"race-data-" + raceData.raceDate} raceAndWeatherData={raceData} />
							);
						}
					})
				}
			</ResultContainer>
		</div>
	);
}
export default WeatherSearch;