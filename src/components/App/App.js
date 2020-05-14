import React from 'react';
import './App.css';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';


function App() {
  
  const [weatherData, setWeatherData] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  
  return (
    <div className="App">
      <SearchBar weatherDataState={[weatherData, setWeatherData]} setSearchResultState={[searchResultData, setSearchResultData]} />
    </div>
  );
}

export default App;