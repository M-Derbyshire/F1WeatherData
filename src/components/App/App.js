import React from 'react';
import './App.css';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import APIReferences from '../APIReferences/APIReferences';
import ResultContainer from '../ResultContainer/ResultContainer';
import RaceWeatherResult from '../RaceWeatherResult/RaceWeatherResult';


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
          searchResultData.map((raceData) => {
            return (
              <RaceWeatherResult key={"race-data-" + raceData.raceDate} raceAndWeatherData={raceData} />
            );
          })
        }
      </ResultContainer>
      
      <APIReferences />
    </div>
  );
}

export default App;