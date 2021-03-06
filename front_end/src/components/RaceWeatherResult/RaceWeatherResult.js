import React from 'react';
import './RaceWeatherResult.css';
import WeatherStat from '../WeatherStat/WeatherStat';


// Props:
// raceAndWeatherData - An object with the race info, and weather data
function RaceWeatherResult(props)
{
    const race = props.raceAndWeatherData;
    const weather = race.weather;
    
    //We want to display the date in DD/MM/YYYY, rather than YYYY-MM-DD.
    //Using www.npmjs.com/package/dateformat
    const dateFormat = require("dateformat");
    const formattedRaceDate = dateFormat(race.raceDate, "dd/mm/yyyy");
    
    //Array of the different values the weather API provides.
    //label (the name to display); key (the property name in the API result); units (the unit of measurement)
    //Add any new ones here.
    const weatherStatData = [
        { label: "Temperature", key: "temp", units: "°C" },
        { label: "Dew Point", key: "dwpt", units: "°C" },
        { label: "Humidity", key: "rhum", units: "%" },
        { label: "Precipitation", key: "prcp", units: "mm" },
        { label: "Snow Depth", key: "snow", units: "mm" },
        { label: "Wind Direction", key: "wdir", units: "°" },
        { label: "Wind Speed", key: "wspd", units: "km/h" },
        { label: "Pressure", key: "pres", units: "hPa" }
    ];
    
    //If no weather data was available, weather will be an empty object (or null, if it came from 
	//the local API). Therefore, display a message if no weather data.
    let weatherStats;
	if(weather && Object.keys(weather).length > 0)
	{
        weatherStats= (<div className="weatherStatContainer">
            {
                weatherStatData.reduce((providedStats, stat) => {
                    if(weather.hasOwnProperty(stat.key))
                    {
                        providedStats.push(
                            <WeatherStat 
                                key={race.raceDate + "-" + stat.key} 
                                name={stat.label} 
                                value={weather[stat.key]} 
                                units={stat.units} 
                            />
                        );
                    }
                    
                    return providedStats;
                }, [])
            }
        </div>);
	 }
	 else
	 {
		 weatherStats = (<div className="weatherStatContainer">
            <span className="noWeatherAvailableMessage">No Weather Data Available for this Race.</span>
        </div>);
	 }
    
    return (
        <div className="RaceWeatherResult">
            <h1>{race.raceName} <span className="raceDate">({formattedRaceDate})</span></h1>
            <h2>{race.circuitName}</h2>
            <h3>{race.locality}, {race.country}</h3>
            {weatherStats}
        </div>
    );
}

export default RaceWeatherResult;