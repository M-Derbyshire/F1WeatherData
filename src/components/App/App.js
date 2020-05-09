import React from 'react';
import './App.css';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';


function App() {
  
  const [weatherData, setWeatherData] = useState([]);
  
  return (
    <div className="App">
      <SearchBar weatherDataState={[weatherData, setWeatherData]} />
    </div>
  );
}

export default App;