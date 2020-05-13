import retrieveWeatherStationID from './retrieveWeatherStationID';

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