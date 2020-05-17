import getMatchingHeldWeatherData from './getMatchingHeldWeatherData';

test("getMatchingHeldWeatherData will return any already held data that matches the search criteria", () => {
    const weatherData = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" },
        { year: "2021", circuitId: "100" }
    ];
    
    //Get all tracks for 2020 ----------------------------------------
    const expectedWeatherData = [
        { year: "2020", circuitId: "100" },
        { year: "2020", circuitId: "200" },
    ];
    
    const result = getMatchingHeldWeatherData(weatherData, "2020");
    expect(result).toStrictEqual(expectedWeatherData);
});