import getMatchingHeldWeatherData from './getMatchingHeldWeatherData';

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
    const expectedWeatherData2 = [
        { year: "2020", circuitId: "100" }
    ];
    
    const result2 = getMatchingHeldWeatherData(weatherData, "2020", "100");
    expect(result2).toStrictEqual(expectedWeatherData2);
});