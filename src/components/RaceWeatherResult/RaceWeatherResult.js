import React from 'react';
import './RaceWeatherResult.css';
import WeatherStat from './WeatherStat/WeatherStat';


/*
If switching the weather data API method to daily, rather than hourly, use the below:

const weatherStatData = [
        { label: "Temperature", key: "temperature", units: "°C" },
        { label: "Precipitation", key: "precipitation", units: "mm" },
        { label: "Snowfall", key: "snowfall", units: "mm" },
        { label: "Snow Depth", key: "snowdepth", units: "mm" },
        { label: "Wind Direction", key: "winddirection", units: "°" },
        { label: "Wind Speed", key: "windspeed", units: "km/h" },
        { label: "Sunshine Duration", key: "sunshine", units: " hours" },
        { label: "Pressure", key: "pressure", units: "hPa" }
    ];
*/



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
    
    //If no weather data was available, weather will be an empty object.
    //Therefore, display a message if no weather data.
    const weatherStats = (Object.keys(weather).length > 0) ? (
        <div className="weatherStatContainer">
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
        </div>
    ) : (
        <div className="weatherStatContainer">
            <span className="noWeatherAvailableMessage">No Weather Data Available for this Race.</span>
        </div>
    );
    
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