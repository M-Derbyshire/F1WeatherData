import retrieveWeatherByStationAndDate from './retrieveWeatherByStationAndDate';

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