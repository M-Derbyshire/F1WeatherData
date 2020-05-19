import retrieveF1DataObject from './retrieveF1DataObject';

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


test("retrieveF1DataObject will return an object with the time property set to 'unknown', if no time is available", async () => {
    
    fetch.resetMocks();
    
    //Have to mock this for the test to work.
    //This is the 3 races worth of data for the 2008 season
    const responseJSON = String.raw`{"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.4","series":"f1",
    "url":"http://ergast.com/api/f1/2008/races.json","limit":"30","offset":"0","total":"18","RaceTable":
    {"season":"2008","Races":[{"season":"2008","round":"1",
    "url":"http:\/\/en.wikipedia.org\/wiki\/2008_Australian_Grand_Prix","raceName":"Australian Grand Prix",
    "Circuit":{"circuitId":"albert_park","url":"http:\/\/en.wikipedia.org\/wiki\/Melbourne_Grand_Prix_Circuit",
    "circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968",
    "locality":"Melbourne","country":"Australia"}},"date":"2008-03-16"},{"season":"2008",
    "round":"2","url":"http:\/\/en.wikipedia.org\/wiki\/2008_Malaysian_Grand_Prix",
    "raceName":"Malaysian Grand Prix","Circuit":{"circuitId":"sepang",
    "url":"http:\/\/en.wikipedia.org\/wiki\/Sepang_International_Circuit","circuitName":"Sepang International Circuit",
    "Location":{"lat":"2.76083","long":"101.738","locality":"Kuala Lumpur","country":"Malaysia"}},
    "date":"2008-03-23"},{"season":"2008","round":"3",
    "url":"http:\/\/en.wikipedia.org\/wiki\/2008_Bahrain_Grand_Prix","raceName":"Bahrain Grand Prix",
    "Circuit":{"circuitId":"bahrain","url":"http:\/\/en.wikipedia.org\/wiki\/Bahrain_International_Circuit",
    "circuitName":"Bahrain International Circuit","Location":{"lat":"26.0325","long":"50.5106","locality":"Sakhir",
    "country":"Bahrain"}},"date":"2008-04-06"}]}}}`;
    
    fetch.mockResponse(responseJSON);
    
    const year = 2008;
    
    let result = await retrieveF1DataObject(year);
    
    result.forEach((race) => {
        //Are these defined and not null?
        expect(race.raceTime).toEqual("unknown");
    });
});