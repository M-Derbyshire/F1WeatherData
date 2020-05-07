import retrieveWeatherData from './weatherDataRetrieval';
import { useState } from 'react';

//Elements/functions/JSON to use in tests
const setTracks = jest.fn();
window.alert = jest.fn();

const settingsJSON = JSON.stringify({
    "oldest_year_available": "2017",
    "meteostat_API_key": ""
});
fetch.mockResponse(settingsJSON);

let yearInput = document.createElement("input");
yearInput.id = "yearInput";
document.body.appendChild(yearInput);
let trackInput = document.createElement("select");
trackInput.id = "trackInput";
document.body.appendChild(trackInput);


test("retrieveWeatherData will set the 'tracks' state if given a valid year", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, setTracks);
    
    expect(setTracks).toHaveBeenCalled();
});

test("retirieveWeatherData will alert if given a year that is too old", async () => {
    
    const yearValue = "1000"; //Creating here, as used in expect condition
    document.getElementById(yearInput.id).value = yearValue;
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, setTracks);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is too long ago, and the data is not available.");
});

test("retirieveWeatherData will alert if given a year that is in the future", async () => {
    
    const yearValue = "3000"; //Creating here, as used in expect condition
    document.getElementById(yearInput.id).value = yearValue;
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, setTracks);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is in the future.");
});

test("retirieveWeatherData will alert if given a year that is in an incorrect format", async () => {
    
    const yearValue = "2K"; //Creating here, as used in expect condition
    document.getElementById(yearInput.id).value = yearValue;
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, setTracks);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is not a valid year input. Please use a 4 digit, YYYY format.");
});

test("retirieveWeatherData will alert if given an empty string for the year", async () => {
    
    document.getElementById(yearInput.id).value = "";
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, setTracks);
    
    expect(window.alert).toHaveBeenCalledWith("Please provide a year to search for.");
});