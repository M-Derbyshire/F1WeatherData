import React from 'react';
import './App.css';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';


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
    </div>
  );
}

export default App;