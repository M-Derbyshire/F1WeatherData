import retrieveF1DataObject from './retrieveF1DataObject';

//This is used when we want to test what parameters are sent on a URL.
//req= request; responseJSON = the response on success; 
//expectedParam = the parameter we expect; expectedVal = the expected value for the parameter;
//onlyTestForParam = should we only test to see if the parameter exists, and not test for the value?
const mockResponseAssertWithPromise = (req, responseJSON, expectedParam, expectedVal, onlyTestForParam = false) => {
	if((!onlyTestForParam && req.url.includes(`${expectedParam}=${expectedVal}`)) || 
		onlyTestForParam && req.url.includes(`${expectedParam}`))
	{
		return Promise.resolve(responseJSON);
	}
	else
	{
		return Promise.reject(`Failed. Expected ${expectedParam} to equal ${expectedVal} -- URL: ${req.url}`);
	}
};


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



test("retrieveF1DataObject will return an array of objects with the required data", async () => {
    
    fetch.resetMocks();
    
    fetch.mockResponse(responseJSON);
    
    const year = 2008;
    
    let result = await retrieveF1DataObject(year, 2);
    
    result.forEach((race) => {
        //Are these defined and not null?
        expect(race.year).toEqual(expect.anything());
		expect(race.quarter).toBe(2);
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
	
	const year = 2008;
	
	//The regular mock response, but without the time values
	const noTimeResponseJSON = String.raw`{"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.4","series":"f1",
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
	
	fetch.resetMocks();
	fetch.mockResponse(noTimeResponseJSON);

	let result = await retrieveF1DataObject(year);

	result.forEach((race) => {
		//Are these defined and not null?
		expect(race.raceTime).toEqual("unknown");
	});
});


test("retrieveF1DataObject will make requests with the given resultOffset value", async () => {

	const year = 2008;
	const expectedParam = "offset";
	const quarterRoundCount = 6;
	
	try
	{
		//We want to pass if these don't throw errors
		
		fetch.resetMocks();
		fetch.mockResponse((req) => {
			return mockResponseAssertWithPromise(req, responseJSON, expectedParam, 0);
		});
		await retrieveF1DataObject(year, 1);
		
		fetch.resetMocks();
		fetch.mockResponse((req) => {
			return mockResponseAssertWithPromise(req, responseJSON, expectedParam, quarterRoundCount);
		});
		await retrieveF1DataObject(year, 2);
		
		fetch.resetMocks();
		fetch.mockResponse((req) => {
			return mockResponseAssertWithPromise(req, responseJSON, expectedParam, quarterRoundCount * 2);
		});
		await retrieveF1DataObject(year, 3);
		
		fetch.resetMocks();
		fetch.mockResponse((req) => {
			return mockResponseAssertWithPromise(req, responseJSON, expectedParam, quarterRoundCount * 3);
		});
		await retrieveF1DataObject(year, 4);
		
		
		expect(true).toBeTruthy();
	}
	catch(err)
	{
		fail(`An error was thrown - ${err}`);
	}
});


test("retrieveF1DataObject will make requests with the correct resultLimit value, based on the round number", async () => {

	const year = 2008;
	const expectedParam = "limit";
	
	try
	{
		//We want to pass if these don't throw errors
		
		for(let i = 0; i < 10; i++)
		{
			fetch.resetMocks();
			fetch.mockResponse((req) => {
				return mockResponseAssertWithPromise(req, responseJSON, expectedParam, i);
			});
			await retrieveF1DataObject(year, 1, i);
		}
		
		expect(true).toBeTruthy();
	}
	catch(err)
	{
		fail(`An error was thrown - ${err}`);
	}
});


test("retrieveF1DataObject will make requests without a limit parameter, if the given resultLimit value is negative", async () => {

	const year = 2008;
	const expectedParam = "limit";
	
	//We want to pass if these throw errors, as that means they were rejected for not 
	//including the parameter
		
	for(let i = -1; i > -10; i--)
	{
		//Just testing that it includes the parameter, not testing the value as well
		//(that being said, the value still matters, as this should only throw if it's negative).
		try
		{
			fetch.resetMocks();
			fetch.mockResponse((req) => {
				return mockResponseAssertWithPromise(req, responseJSON, expectedParam, i, true);
			});
			await retrieveF1DataObject(year, 1, i);
			
			fail(`An error was not thrown when it was expected. The resultLimit value was ${i}.`);
		}
		catch(err)
		{
			//We don't need to do anything here, as reaching here each time is a pass state
		}
		
		expect(true).toBeTruthy();
	}
	
});