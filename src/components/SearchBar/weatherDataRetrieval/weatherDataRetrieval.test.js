import retrieveWeatherData, { 
    getMatchingHeldWeatherData, 
    retrieveF1DataObject, 
    retrieveWeatherStationID,
    retrieveWeatherByStationAndDate
} from './weatherDataRetrieval';
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
    
    document.getElementById(yearInput.id).value = "2008";
    document.getElementById(trackInput.id).value = "all";
    const setWeatherData = jest.fn();
    const setSearchOutput = jest.fn();
    
    //Mock multiple fetch calls
    fetch.mockResponses(
        [
            JSON.stringify({ //Settings JSON
                oldest_year_available: "1980",
                meteostat_API_key: ""
            }),
            { status: 200 }
        ],
        [
            //The F1 data for a single race
            String.raw`{"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.4","series":"f1",
            "url":"http://ergast.com/api/f1/2008/races.json","limit":"30","offset":"0","total":"18","RaceTable":
            {"season":"2008","Races":[{"season":"2008","round":"1",
            "url":"http:\/\/en.wikipedia.org\/wiki\/2008_Australian_Grand_Prix","raceName":"Australian Grand Prix",
            "Circuit":{"circuitId":"albert_park","url":"http:\/\/en.wikipedia.org\/wiki\/Melbourne_Grand_Prix_Circuit",
            "circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968",
            "locality":"Melbourne","country":"Australia"}},"date":"2008-03-16","time":"04:30:00Z"}]}}}`,
            { status: 200 }
        ],
        [
            //Station ID response
            String.raw`{"meta":{"source":"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"},
            "data":[{"id":"94868","name":"Melbourne","distance":"2.3"}]}`,
            {status: 200}
        ],
        [
            //Weather by station and date.
            String.raw`{"meta":{"source":"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"},
            "data":[{"date":"2008-03-16","temperature":null,"temperature_min":19.2,"temperature_max":39.1,
            "precipitation":null,"snowfall":null,"snowdepth":null,"winddirection":null,"windspeed":null,
            "peakgust":null,"sunshine":null,"pressure":null}]}`,
            {status: 200}
        ]
    );
    
    //A year after the one we're retrieving
    const currentWeatherData = [
        { year: '2009',
        circuitId: 'albert_park',
        circuitName: 'Albert Park Grand Prix Circuit',
        raceName: 'Australian Grand Prix',
        round: '1',
        locality: 'Melbourne',
        country: 'Australia',
        lat: '-37.8497',
        long: '144.968',
        raceDate: '2009-03-16',
        raceTime: '04:30:00Z',
        stationID: '94868',
        weather: {  } 
        }
    ];
    
    const expectedOutputResult = [
        { year: '2008',
        circuitId: 'albert_park',
        circuitName: 'Albert Park Grand Prix Circuit',
        raceName: 'Australian Grand Prix',
        round: '1',
        locality: 'Melbourne',
        country: 'Australia',
        lat: '-37.8497',
        long: '144.968',
        raceDate: '2008-03-16',
        raceTime: '04:30:00Z',
        stationID: '94868',
        weather:
         { date: '2008-03-16',
           temperature: null,
           temperature_min: 19.2,
           temperature_max: 39.1,
           precipitation: null,
           snowfall: null,
           snowdepth: null,
           winddirection: null,
           windspeed: null,
           peakgust: null,
           sunshine: null,
           pressure: null } 
        }
    ];
    
    const expectedWeatherDataStateResult = [
        ...currentWeatherData,
        ...expectedOutputResult
    ];
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, currentWeatherData, setWeatherData, setSearchOutput);
    
    
    expect(setWeatherData).toHaveBeenCalledWith(expect.arrayContaining(expectedWeatherDataStateResult));
    expect(setSearchOutput).toHaveBeenCalledWith(expect.arrayContaining(expectedOutputResult));
});




test("retirieveWeatherData will call displayInvalidYearAlert() if given an incorrect year value", async () => {
    
    document.getElementById(yearInput.id).value = "2K20"; //Invalid year input
    document.getElementById(trackInput.id).value = "all";
    window.alert = jest.fn();
    
    
    
    await retrieveWeatherData(yearInput.id, trackInput.id, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput);
    
    
    //Cannot mock displayInvalidYearAlert(), as it's nested, so just check an alert was raised
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


test("retrieveF1DataObject will return an array of objects with the required data", async () => {
    
    fetch.resetMocks();
    
    //Have to mock this for the test to work.
    //This is the 3 races worth of data for the 2008 season
    const responseJSON = String.raw`{"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.4","series":"f1",
    "url":"http://ergast.com/api/f1/2008/races.json","limit":"30","offset":"0","total":"18","RaceTable":
    {"season":"2008","Races":[{"season":"2008","round":"1",
    "url":"http:\/\/en.wikipedia.org\/wiki\/2008_Australian_Grand_Prix","raceName":"Australian Grand Prix",
    "Circuit":{"circuitId":"albert_park","url":"http:\/\/en.wikipedia.org\/wiki\/Melbourne_Grand_Prix_Circuit",
    "circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968",
    "locality":"Melbourne","country":"Australia"}},"date":"2008-03-16","time":"04:30:00Z"},{"season":"2008",
    "round":"2","url":"http:\/\/en.wikipedia.org\/wiki\/2008_Malaysian_Grand_Prix",
    "raceName":"Malaysian Grand Prix","Circuit":{"circuitId":"sepang",
    "url":"http:\/\/en.wikipedia.org\/wiki\/Sepang_International_Circuit","circuitName":"Sepang International Circuit",
    "Location":{"lat":"2.76083","long":"101.738","locality":"Kuala Lumpur","country":"Malaysia"}},
    "date":"2008-03-23","time":"07:00:00Z"},{"season":"2008","round":"3",
    "url":"http:\/\/en.wikipedia.org\/wiki\/2008_Bahrain_Grand_Prix","raceName":"Bahrain Grand Prix",
    "Circuit":{"circuitId":"bahrain","url":"http:\/\/en.wikipedia.org\/wiki\/Bahrain_International_Circuit",
    "circuitName":"Bahrain International Circuit","Location":{"lat":"26.0325","long":"50.5106","locality":"Sakhir",
    "country":"Bahrain"}},"date":"2008-04-06","time":"11:30:00Z"}]}}}`;
    
    fetch.mockResponse(responseJSON);
    
    const year = 2008;
    
    let result = await retrieveF1DataObject(year);
    
    result.forEach((race) => {
        //Are these defined and not null?
        expect(race.year).toEqual(expect.anything());
        expect(race.circuitId).toEqual(expect.anything());
        expect(race.circuitName).toEqual(expect.anything());
        expect(race.raceName).toEqual(expect.anything());
        expect(race.round).toEqual(expect.anything());
        expect(race.locality).toEqual(expect.anything());
        expect(race.country).toEqual(expect.anything());
        expect(race.lat).toEqual(expect.anything());
        expect(race.long).toEqual(expect.anything());
        expect(race.raceDate).toEqual(expect.anything());
        expect(race.raceTime).toEqual(expect.anything());
    });
});



test("retrieveWeatherStationID will return the weather station ID from the API", async () => {
    fetch.resetMocks();
    
    fetch.mockResponseOnce(JSON.stringify({
        meta: {
            source: "National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[
            {
                id: "94868",
                name: "Melbourne",
                distance: "2.3"
            }
        ]
    }));
    
    const result = await retrieveWeatherStationID(0, 0, "mockedAPI");
    
    await expect(result).toBe("94868");
});



test("retrieveWeatherByStationAndDate will return the day's weather data from the API", async () => {
    fetch.resetMocks();
    
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[
            {
                date:"2008-06-22", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            },
            {
                date:"2008-06-23", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            }
        ]
    }));
    
    const date = "2008-06-22";
    
    
    const result = await retrieveWeatherByStationAndDate("test", date, "test");
    
    
    const expectedResult = {
        date:"2008-06-22", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
        precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
        peakgust:null, sunshine:null, pressure:1016.2
    }
    
    await expect(result).toStrictEqual(expectedResult);
});

test("retrieveWeatherByStationAndDate will return null if there is no weather data from the API", async () => {
    fetch.resetMocks();
    
    //Empty data array provided
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[]
    }));
    
    const date = "2008-06-22";
    
    
    const result = await retrieveWeatherByStationAndDate("test", date, "test");
    
    await expect(result).toBeNull();
});