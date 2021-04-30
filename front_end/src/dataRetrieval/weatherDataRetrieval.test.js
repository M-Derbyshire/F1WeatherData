import retrieveWeatherData from './weatherDataRetrieval';

//Elements/functions to use in tests
let yearInput = document.createElement("input");
yearInput.id = "yearInput";
document.body.appendChild(yearInput);

const apiSettings = null;
const setApiSettings = (val) => {};
const setWeatherData = (val) => {};
const setSearchOutput = (val) => {};

const authHeader = "Bearer: test";

afterEach(() => {
  jest.clearAllMocks();
});

test("retrieveWeatherData will set the 'weatherData' and 'searchOutput' state if given a valid year", async () => {
    
    const year = "2008";
	const quarter = 1;
    const setWeatherData = jest.fn();
    const setSearchOutput = jest.fn();
    
    //Mock multiple fetch calls
    fetch.mockResponses(
        [
            JSON.stringify({ //Settings JSON
                oldest_year_available: "1980",
                meteostat_API_key: "",
				local_api_base_address: "/"
            }),
            { status: 200 }
        ],
		[
			//The local API response
			"[]"
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
            "data":[{"time":"2008-03-16 04:00:00","temp":12.2,"dwpt":7.9,"rhum":75,"prcp":0.1,"snow":null,"wspd":0,"wpgt":16.7,"wdir":270,"pres":1016,"coco":4}]}`,
            {status: 200}
        ],
		[
			{status: 200} //for the local API
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
                temp:12.2,
                dwpt:7.9,
                rhum:75,
                prcp:0.1,
                snow:null,
                wspd:0,
                wpgt:16.7,
                wdir:270,
                pres:1016,
                coco:4 
            } 
        }
    ];
    
    const expectedWeatherDataStateResult = [
        ...currentWeatherData,
        ...expectedOutputResult
    ];
    
    
    await retrieveWeatherData(year, quarter, apiSettings, setApiSettings, currentWeatherData, setWeatherData, setSearchOutput, authHeader);
    
    expect(setWeatherData).toHaveBeenCalledWith(expect.arrayContaining(expectedWeatherDataStateResult));
    expect(setSearchOutput).toHaveBeenCalledWith(expect.arrayContaining(expectedOutputResult));
});




test("retrieveWeatherData will call displayInvalidYearAlert() if given an incorrect year value", async () => {
    
    const year = "2K20"; //Invalid year input
	const quarter = 1;
    window.alert = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({
        "oldest_year_available": "1980",
        "meteostat_API_key": "test"
    }));
    
    
    
    await retrieveWeatherData(year, quarter, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput, authHeader);
    
    
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
    const year = "2020";
	const quarter = 1;
    
    await retrieveWeatherData(year, quarter, apiSettings, setApiSettings, weatherData, setWeatherData, mockedSetSearchOutput, authHeader);
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
	
	const year = "2020";
	const quarter = 1;
    
    await retrieveWeatherData(year, quarter, apiSettings, throwWhenSettingAPISettings, {}, setWeatherData, setSearchOutputWithErrorObject, authHeader);
    
    
    expect(searchOutput.length).toBe(1);
    expect(searchOutput[0]).toHaveProperty("error");
    expect(searchOutput[0].error).toContain("Test Exception");
    expect(searchOutput[0]).toHaveProperty("isException");
    expect(searchOutput[0].isException).toBeTruthy();
});





test("retrieveWeatherData will set the searchOutput to an array with an error message object, if there is no F1 data available", async () => {
    
    const year = "2020";
	const quarter = 1;
    
    fetch.resetMocks();
    
    const preLoadedApiSettings = JSON.stringify({ //Settings JSON
        oldest_year_available: "1980",
        meteostat_API_key: ""
    })
    
    fetch.mockResponses(
		[
			JSON.stringify({
				MRData:{
					xmlns:"http:\/\/ergast.com\/mrd\/1.4", 
					series:"f1",
					url:"http://ergast.com/api/f1/1930/races.json",
					limit:"30",
					offset:"0",
					total:"0",
					RaceTable:{season:"1930",Races:[]}
				}
			})
		]
    );
    
    let searchOutput = [];
    const setSearchOutputWithErrorObject = (val) => {
        searchOutput = val;
    };
    
    
    
    await retrieveWeatherData(year, quarter, preLoadedApiSettings, setApiSettings, {}, setWeatherData, setSearchOutputWithErrorObject, authHeader);
    
    expect(searchOutput.length).toBe(1);
    expect(searchOutput[0]).toHaveProperty("error");
    expect(searchOutput[0]).toHaveProperty("isException");
    expect(searchOutput[0].isException).toBeFalsy();
});


test("retrieveWeatherData will display an alert if given an incorrect quarter value", async () => {
    
    const year = "2020";
	const quarter = "first"; //Should be an integer
    window.alert = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({
        "oldest_year_available": "1980",
        "meteostat_API_key": "test"
    }));
    
    
    
    await retrieveWeatherData(year, quarter, apiSettings, setApiSettings, {}, setWeatherData, setSearchOutput, authHeader);
    
    expect(window.alert).toHaveBeenCalled();
});