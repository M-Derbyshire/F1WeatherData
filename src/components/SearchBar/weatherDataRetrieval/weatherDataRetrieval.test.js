import retrieveWeatherData, { getMatchingHeldWeatherData } from './weatherDataRetrieval';
import { useState } from 'react';

//Elements/functions to use in tests
let yearInput = document.createElement("input");
yearInput.id = "yearInput";
document.body.appendChild(yearInput);

let trackInput = document.createElement("select");
let trackOptionAll = document.createElement("option");
let trackOption100 = document.createElement("option");
trackOptionAll.value = "all";
trackOption100.value = "100";
trackInput.appendChild(trackOptionAll);
trackInput.appendChild(trackOption100);
trackInput.id = "trackInput";
document.body.appendChild(trackInput);

const apiSettings = null;
const setApiSettings = (val) => {};
const setWeatherData = (val) => {};
const setSearchOutput = (val) => {};


test("retrieveWeatherData will set the 'weatherData' and 'searchOutput' state if given a valid year", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    const setWeatherData = jest.fn();
    const setSearchOutput = jest.fn();
    
    const settingsJSON = JSON.stringify({
        "oldest_year_available": "2017",
        "meteostat_API_key": ""
    });
    fetch.mockResponse(settingsJSON);
    
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput);
    
    
    expect(setWeatherData).toHaveBeenCalled();
    expect(setSearchOutput).toHaveBeenCalled();
});



test("retirieveWeatherData will call displayInvalidYearAlert() if given an incorrect year value", async () => {
    
    document.getElementById(yearInput.id).value = "2K20"; //Invalid year input
    document.getElementById(trackInput.id).value = "all";
    window.alert = jest.fn();
    
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput);
    
    
    //Cannot mock displayInvalidYearAlert(), as it's nested, so just check an alert was raised
    expect(window.alert).toHaveBeenCalled();
});



test("retrieveWeatherData will trigger an alert if there are missing API settings", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    window.alert = jest.fn();
    
    
    const settingsJSON = JSON.stringify({
        "oldest_year_available": "2017",
        "meteostat_API_key": ""
    });
    fetch.mockResponse(settingsJSON);
    
    
    //Missing the API key
    await retrieveWeatherData(yearInput.id, trackInput.id, { 
        oldest_year_available: "2017" 
    }, setApiSettings, {}, setWeatherData, setSearchOutput);
    
    
    expect(window.alert).toHaveBeenCalled();
});



test("retrieveWeatherData will call setSearchOutput if getMatchingHeldWeatherData() returns results", async () => {
    
    const settingsJSON = JSON.stringify({
        "oldest_year_available": "2017",
        "meteostat_API_key": ""
    });
    fetch.mockResponse(settingsJSON);
    
    const mockedSetSearchOutput = jest.fn();
    
    const weatherData = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" },
        { year: "2021", circuitId: "100" }
    ];
    
    const expectedWeatherData = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" }
    ];
    
    //Get all tracks for 2020 ----------------------------------------
    document.getElementById(yearInput.id).value = "2020";
    document.getElementById(trackInput.id).value = "all";
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, weatherData, setWeatherData, mockedSetSearchOutput);
    expect(mockedSetSearchOutput).toHaveBeenCalledWith(expectedWeatherData);
});


test("getMatchingHeldWeatherData will return any already held data that matches the search criteria", () => {
    const weatherData = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" },
        { year: "2021", circuitId: "100" }
    ];
    
    //Get all tracks for 2020 ----------------------------------------
    const expectedWeatherData1 = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" },
    ];
    
    const result1 = getMatchingHeldWeatherData(weatherData, "2020", "all");
    expect(result1).toStrictEqual(expectedWeatherData1);
    
    
    //Get only track 100, only for 2020 ----------------------------------------
    document.getElementById(trackInput.id).value = "100";
    
    const expectedWeatherData2 = [
        { year: "2020", circuitId: "100" }
    ];
    
    const result2 = getMatchingHeldWeatherData(weatherData, "2020", "100");
    expect(result2).toStrictEqual(expectedWeatherData2);
});