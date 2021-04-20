import React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import APIReferences from '../APIReferences/APIReferences';
import WeatherSearch from '../WeatherSearch/WeatherSearch';
import AboutInfo from '../AboutInfo/AboutInfo';


function App() {

	const [weatherData, setWeatherData] = useState([]);
	const [searchResultData, setSearchResultData] = useState([]);
	const [isRetrievingData, setIsRetrievingData] = useState(false);

	return (
		<Router>
			<div className="App">
				
				<NavBar />
				
				<Switch>
					<Route exact path="/">
						<WeatherSearch 
							weatherData={weatherData}
							setWeatherData={setWeatherData}
							searchResultData={searchResultData}
							setSearchResultData={setSearchResultData}
							isRetrievingData={isRetrievingData}
							setIsRetrievingData={setIsRetrievingData}
						/>
					</Route>
					
					<Route exact path="/about">
						<AboutInfo />
					</Route>
				</Switch>
				
				<APIReferences />
			</div>
		</Router>
	);
}

export default App;