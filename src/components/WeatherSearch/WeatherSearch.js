import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ResultContainer from '../ResultContainer/ResultContainer';
import RaceWeatherResult from '../RaceWeatherResult/RaceWeatherResult';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DataRetrievingMessage from '../DataRetrievingMessage/DataRetrievingMessage';

function WeatherSearch(props)
{
	return (
		<div className="WeatherSearch">
			<SearchBar 
				weatherDataState={[props.weatherData, props.setWeatherData]} 
				setSearchResultState={props.setSearchResultData} 
				setIsRetrievingDataState={props.setIsRetrievingData}
			/>

			<ResultContainer>
				{
					//If we are currently retrieving data, display a message to show this
					props.isRetrievingData && <DataRetrievingMessage />
				}

				{/* If we are not currently retrieving any data, display the searchOutput (if there's any to show) */}
				{!props.isRetrievingData && props.searchResultData.map((raceData, index) => {
						
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