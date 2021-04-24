import retrieveWeatherByStationDateTime from './retrieveWeatherByStationDateTime';

test("retrieveWeatherByStationDateTime will return the day's weather data from the API", async () => {
    fetch.resetMocks();
    
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[
            {
                time: "2008-06-22 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            },
            {
                time:"2008-06-23 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            }
        ]
    }));
    
    const date = "2008-06-22";
    const time = "13:00:00Z";
    
    
    const result = await retrieveWeatherByStationDateTime("test", date, time, "test");
    
    
    const expectedResult = {
        time: "2008-06-22 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
        precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
        peakgust:null, sunshine:null, pressure:1016.2
    }
    
    await expect(result).toStrictEqual(expectedResult);
});

test("retrieveWeatherByStationDateTime will return null if there is no weather data from the API", async () => {
    fetch.resetMocks();
    
    //Empty data array provided
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[]
    }));
    
    const date = "2008-06-22";
    const time = "13:00:00";
    
    
    const result = await retrieveWeatherByStationDateTime("test", date, time, "test");
    
    await expect(result).toBeNull();
});



test("retrieveWeatherByStationDateTime will return null if the given stationID is a blank string", async () => {
    
    const date = "2008-06-22";
    const time = "13:00:00";
    
    const result = await retrieveWeatherByStationDateTime("", date, time, "test"); //Empty station ID string 
    
    await expect(result).toBeNull();
    
});

test("retrieveWeatherByStationDateTime will return the date object for the correct hour", async () => {
    
    fetch.resetMocks();
    
    //Same date, but different times
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[
            {
                time: "2008-06-22 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            },
            {
                time:"2008-06-22 14:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            }
        ]
    }));
    
    const date = "2008-06-22";
    const time = "13:35:00Z";
    
    
    const result = await retrieveWeatherByStationDateTime("test", date, time, "test");
    
    
    const expectedResult = {
        time: "2008-06-22 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
        precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
        peakgust:null, sunshine:null, pressure:1016.2
    }
    
    await expect(result).toStrictEqual(expectedResult);
    
});


test("retrieveWeatherByStationDateTime will return the date object for 12:00:00, if provided time is 'unknown'", async () => {
    
    fetch.resetMocks();
    
    //Same date, but different times
    fetch.mockResponseOnce(JSON.stringify({
        meta:{
            source:"National Oceanic and Atmospheric Administration, Deutscher Wetterdienst"
        },
        data:[
            {
                time: "2008-06-22 12:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            },
            {
                time:"2008-06-22 13:00:00", temperature:21.6, temperature_min:17.6, temperature_max:26.4,
                precipitation:null, snowfall:null, snowdepth:null, winddirection:null, windspeed:7.6,
                peakgust:null, sunshine:null, pressure:1016.2
            }
        ]
    }));
    
    const date = "2008-06-22";
    const time = "unknown";
    
    
    const result = await retrieveWeatherByStationDateTime("test", date, time, "test");
    
    await expect(result.time).toEqual(date + " " + "12:00:00");
    
});