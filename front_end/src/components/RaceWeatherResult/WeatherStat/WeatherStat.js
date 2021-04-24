import React from 'react';
import './WeatherStat.css';

//Props:
//name - The name of the stat
//value - The value of the stat
//units - the unit of measurement for the stat
function WeatherStat(props)
{
    let units = (props.hasOwnProperty("units")) ? props.units : "";
    const value = (props.value !== null) ? props.value + units : "Not Available";
    
    return (
        <div className="WeatherStat">
            <span className="statName">{props.name}:</span> <span className="statValue">{value}</span>
        </div>
    );
}

export default WeatherStat;