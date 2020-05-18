import React from 'react';
import './App.css';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import APIReferences from '../APIReferences/APIReferences';
import ResultContainer from '../ResultContainer/ResultContainer';
import RaceWeatherResult from '../RaceWeatherResult/RaceWeatherResult';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


function App() {
  
  const [weatherData, setWeatherData] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [isRetrievingData, setIsRetrievingData] = useState(false);
  
  return (
    <div className="App">
      <SearchBar 
        weatherDataState={[weatherData, setWeatherData]} 
        searchResultState={[searchResultData, setSearchResultData]} 
        setIsRetrievingDataState={setIsRetrievingData}
      />
      
      <ResultContainer>
        {
          searchResultData.map((raceData, index) => {
            
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
      
      <APIReferences />
    </div>
  );
}

export default App;