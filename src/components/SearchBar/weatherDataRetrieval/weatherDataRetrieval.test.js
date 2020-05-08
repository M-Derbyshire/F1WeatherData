import retrieveWeatherData from './weatherDataRetrieval';
import { useState } from 'react';

//Elements/functions to use in tests
let yearInput = document.createElement("input");
yearInput.id = "yearInput";
document.body.appendChild(yearInput);
let trackInput = document.createElement("select");
trackInput.id = "trackInput";
document.body.appendChild(trackInput);
const apiSettings = null;
const setApiSettings = (val) => {};


test("retrieveWeatherData will set the 'tracks' state if given a valid year", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    const setTracks = jest.fn();
    
    const settingsJSON = JSON.stringify({
        "oldest_year_available": "2017",
        "meteostat_API_key": ""
    });
    fetch.mockResponse(settingsJSON);
    
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, setTracks);
    
    
    
    expect(setTracks).toHaveBeenCalled();
});

test("retirieveWeatherData will call displayInvalidYearAlert() if given an incorrect year value", async () => {
    
    document.getElementById(yearInput.id).value = "2K20"; //Invalid year input
    document.getElementById(trackInput.id).value = "all";
    const setTracks = (val) => {};
    window.alert = jest.fn();
    
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, setTracks);
    
    
    //Cannot mock displayInvalidYearAlert(), as it's nested, so just check an alert was raised
    expect(window.alert).toHaveBeenCalled();
});

test("retrieveWeatherData will trigger an alert if there are missing API settings", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    const setTracks = (val) => {};
    window.alert = jest.fn();
    
    
    const settingsJSON = JSON.stringify({
        "oldest_year_available": "2017",
        "meteostat_API_key": ""
    });
    fetch.mockResponse(settingsJSON);
    
    
    //Missing the API key
    await retrieveWeatherData(yearInput.id, trackInput.id, { 
        oldest_year_available: "2017" 
    }, setApiSettings, setTracks);
    
    
    expect(window.alert).toHaveBeenCalled();
});