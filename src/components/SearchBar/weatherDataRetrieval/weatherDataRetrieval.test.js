import retrieveWeatherData from './weatherDataRetrieval';

//Elements/functions to use in tests
let yearInput = document.createElement("input");
yearInput.id = "yearInput";
document.body.appendChild(yearInput);

const apiSettings = null;
const setApiSettings = (val) => {};
const setWeatherData = (val) => {};
const setSearchOutput = (val) => {};


test("retrieveWeatherData will set the 'weatherData' and 'searchOutput' state if given a valid year", async () => {
    
    document.getElementById(yearInput.id).value = "2008";
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
            "data":[{"time":"2008-03-16 04:00:00", "time_local":"2008-03-16 05:00:00", "temperature":12.2,
                "dewpoint":7.9, "humidity":75, "precipitation":0.1, "precipitation_3":null, "precipitation_6":null,
                "snowdepth":null, "windspeed":0, "peakgust":16.7, "winddirection":270, "pressure":1016, 
                "condition":4}]}`,
            {status: 200}
        ]
    );
    
    //A year after the one we're retrieving
    const currentWeatherData = [
        { 
			year: '2009',
			quarter: 1,
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
        { 
            year: '2008',
			quarter: 1,
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
            { 
                time:"2008-03-16 04:00:00",
                time_local:"2008-03-16 05:00:00",
                temperature:12.2,
                dewpoint:7.9,
                humidity:75,
                precipitation:0.1,
                precipitation_3:null,
                precipitation_6:null,
                snowdepth:null,
                windspeed:0,
                peakgust:16.7,
                winddirection:270,
                pressure:1016,
                condition:4 
            } 
        }
    ];
    
    const expectedWeatherDataStateResult = [
        ...currentWeatherData,
        ...expectedOutputResult
    ];
    
    
    await retrieveWeatherData(yearInput.id, apiSettings, setApiSettings, currentWeatherData, setWeatherData, setSearchOutput);
    
    expect(setWeatherData).toHaveBeenCalledWith(expect.arrayContaining(expectedWeatherDataStateResult));
    expect(setSearchOutput).toHaveBeenCalledWith(expect.arrayContaining(expectedOutputResult));
});




test("retrieveWeatherData will call displayInvalidYearAlert() if given an incorrect year value", async () => {
    
    document.getElementById(yearInput.id).value = "2K20"; //Invalid year input
    window.alert = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({
        "oldest_year_available": "1980",
        "meteostat_API_key": "test"
    }));
    
    
    
    await retrieveWeatherData(yearInput.id, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput);
    
    
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
        { year: "2020", circuitId: "100", quarter: 1 },
        { year: "2020", circuitId: "200", quarter: 1 },
        { year: "2021", circuitId: "100", quarter: 1 }
    ];
    
    const expectedWeatherData = [
        { year: "2020", circuitId: "100", quarter: 1 },
        { year: "2020", circuitId: "200", quarter: 1 }
    ];
    
    //Get all tracks for 2020 ----------------------------------------
    document.getElementById(yearInput.id).value = "2020";
    
    await retrieveWeatherData(yearInput.id, apiSettings, setApiSettings, weatherData, setWeatherData, mockedSetSearchOutput);
    expect(mockedSetSearchOutput).toHaveBeenCalledWith(expectedWeatherData);
});





test("retrieveWeatherData will set the searchOutput to an array with an error object, when throwing an exception", async () => {
    
    const throwWhenSettingAPISettings = (val) => {
        throw new Error("Test Exception");
    }
    
    let searchOutput = [];
    const setSearchOutputWithErrorObject = (val) => {
        searchOutput = val;
    };
    
    await retrieveWeatherData(yearInput.id, apiSettings, throwWhenSettingAPISettings, {}, setWeatherData, setSearchOutputWithErrorObject);
    
    
    expect(searchOutput.length).toBe(1);
    expect(searchOutput[0]).toHaveProperty("error");
    expect(searchOutput[0].error).toContain("Test Exception");
    expect(searchOutput[0]).toHaveProperty("isException");
    expect(searchOutput[0].isException).toBeTruthy();
});





test("retrieveWeatherData will set the searchOutput to an array with an error message object, if there is no F1 data available", async () => {
    
    document.getElementById(yearInput.id).value = "2020";
    
    fetch.resetMocks();
    
    const preLoadedApiSettings = JSON.stringify({ //Settings JSON
        oldest_year_available: "1980",
        meteostat_API_key: ""
    })
    
    fetch.mockResponseOnce(JSON.stringify({
        MRData:{
            xmlns:"http:\/\/ergast.com\/mrd\/1.4", 
            series:"f1",
            url:"http://ergast.com/api/f1/1930/races.json",
            limit:"30",
            offset:"0",
            total:"0",
            RaceTable:{season:"1930",Races:[]}
        }
    }));
    
    let searchOutput = [];
    const setSearchOutputWithErrorObject = (val) => {
        searchOutput = val;
    };
    
    
    
    await retrieveWeatherData(yearInput.id, preLoadedApiSettings, setApiSettings, {}, setWeatherData, setSearchOutputWithErrorObject);
    
    
    expect(searchOutput.length).toBe(1);
    expect(searchOutput[0]).toHaveProperty("error");
    expect(searchOutput[0]).toHaveProperty("isException");
    expect(searchOutput[0].isException).toBeFalsy();
});