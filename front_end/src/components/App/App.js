import React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import APIReferences from '../APIReferences/APIReferences';
import WeatherSearch from '../WeatherSearch/WeatherSearch';
import AboutInfo from '../AboutInfo/AboutInfo';
import RouteNotFoundMessage from '../RouteNotFoundMessage/RouteNotFoundMessage';


function App() {

	//The apiSettings, loaded from api_settings.json
    const apiSettingsState = useState(null);
	
	const [weatherData, setWeatherData] = useState([]);
	const [searchResultData, setSearchResultData] = useState([]);
	const [isRetrievingData, setIsRetrievingData] = useState(false);
	
	const weatherResultsStatesData = {
		weatherDataState: [weatherData, setWeatherData],
		searchResultDataState: [searchResultData, setSearchResultData],
		isRetrievingDataState: [isRetrievingData, setIsRetrievingData]
	};

	return (
		<Router>
			<div className="App">
				
				<NavBar />
				
				<Switch>
					<Route exact path="/">
						<WeatherSearch weatherResultsStates={weatherResultsStatesData} apiSettingsState={apiSettingsState} />
					</Route>
					
					<Route exact path="/about">
						<AboutInfo />
					</Route>
					
					<Route path="/">
						<RouteNotFoundMessage />
					</Route>
				</Switch>
				
				<APIReferences />
			</div>
		</Router>
	);
}

export default App;