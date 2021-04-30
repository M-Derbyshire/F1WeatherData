import postDataToLocalAPI, { map3rdPartyDataToLocalAPIObject } from './postDataToLocalAPI';

const example3rdPartyDataStructure = {
	circuitId: "test",
	circuitName: "test",
	country: "test",
	lat: "0",
	locality: "test",
	long: "0",
	quarter: 1,
	raceDate: "test",
	raceName: "test",
	raceTime: "00:00:00Z",
	round: "1",
	stationID: "TEST",
	year: "2021",
	weather: {
		coco: null,
		dwpt: null,
		prcp: null,
		pres: null,
		rhum: null,
		snow: null,
		temp: null,
		time: "test",
		tsun: null,
		wdir: null,
		wpgt: null,
		wspd: null
	}
};


test("map3rdPartyDataToLocalAPIObject will keep the round data in the outer object (won't embedd them)", () => {
	
	const result = map3rdPartyDataToLocalAPIObject(example3rdPartyDataStructure);
	
	expect(result.hasOwnProperty("round")).toBeTruthy();
	expect(result.hasOwnProperty("raceDate")).toBeTruthy();
	expect(result.hasOwnProperty("raceTime")).toBeTruthy();
	expect(result.hasOwnProperty("quarter")).toBeTruthy();
	expect(result.hasOwnProperty("raceName")).toBeTruthy();
	
});

test("map3rdPartyDataToLocalAPIObject will move the circuit data into an inner object (and country data to an objct within that)", () => {
	
	const result = map3rdPartyDataToLocalAPIObject(example3rdPartyDataStructure);
	
	expect(result.hasOwnProperty("circuit")).toBeTruthy();
	expect(result.circuit.hasOwnProperty("country")).toBeTruthy();
	
	expect(result.hasOwnProperty("circuitId")).toBeFalsy();
	expect(result.hasOwnProperty("circuitName")).toBeFalsy();
	expect(result.hasOwnProperty("lat")).toBeFalsy();
	expect(result.hasOwnProperty("lon")).toBeFalsy();
	expect(result.hasOwnProperty("locality")).toBeFalsy();
	expect(result.hasOwnProperty("country")).toBeFalsy();
	
	
	
	expect(result.circuit.country.hasOwnProperty("name")).toBeTruthy();
	
	expect(result.circuit.hasOwnProperty("circuitId")).toBeTruthy();
	expect(result.circuit.hasOwnProperty("circuitName")).toBeTruthy();
	expect(result.circuit.hasOwnProperty("lat")).toBeTruthy();
	expect(result.circuit.hasOwnProperty("lon")).toBeTruthy();
	expect(result.circuit.hasOwnProperty("locality")).toBeTruthy();
	
});

test("map3rdPartyDataToLocalAPIObject will set the weather data to null, if it was orginially an empty object", () => {
	
	let structureWithEmptyWeather = { ...example3rdPartyDataStructure };
	structureWithEmptyWeather.weather = {};
	
	const result = map3rdPartyDataToLocalAPIObject(structureWithEmptyWeather);
	
	expect(result.weather).toBe(null);
});

test("the only change map3rdPartyDataToLocalAPIObject will make to a non-empty weather object is to add the stationID", () => {
	
	const weather = { ...example3rdPartyDataStructure.weather };
	const expected = { ...weather, stationID: example3rdPartyDataStructure.stationID }
	
	const result = map3rdPartyDataToLocalAPIObject(example3rdPartyDataStructure);
	
	expect(result.weather).toEqual(expected);
});

test("map3rdPartyDataToLocalAPIObject will remove the Z from the end of the raceTime", () => {
	
	const result = map3rdPartyDataToLocalAPIObject(example3rdPartyDataStructure);
	
	expect(result.raceTime.toLowerCase()).toEqual(expect.not.stringContaining("z"));
});



test("postDataToLocalAPI will throw an error if the passed authHeader is null", async () => {
	
	try
	{
		const result = await postDataToLocalAPI([], null, "/");
		fail("Should not reach here");
	}
	catch(err)
	{
		expect(err.message).toBe("Cannot POST to local API, as no Authorization header has been provided.");
	}
});

test("postDataToLocalAPI will throw an error if the passed apiBaseURL is null", async () => {
	
	try
	{
		const result = await postDataToLocalAPI([], "test", null);
		fail("Should not reach here");
	}
	catch(err)
	{
		expect(err.message).toBe("Cannot POST to local API, as no address for the API has been provided.");
	}
});

test("postDataToLocalAPI will throw an error if there is a problem with the API", async () => {
	
	global.fetch = jest.fn(() => Promise.reject("API is down"));
	
	try
	{
		await postDataToLocalAPI([], "test", "/");
	}
	catch(e)
	{
		expect(e.message).toContain("Error connecting to local API - ");
	}
});

test("postDataToLocalAPI will throw an error if it receives a bad status (not a 403)", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			status: 404
		})
	);
	
	try
	{
		await postDataToLocalAPI([], "test", "/");
		fail("Should not reach here");
	}
	catch(e)
	{
		expect(e.message).toContain("The server returned a bad response to the POST request.");
	}
});

test("postDataToLocalAPI will not throw an error if it receives a good response", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			status: 200
		})
	);
	
	try
	{
		await postDataToLocalAPI([], "test", "/");
		expect(true).toBeTruthy();
	}
	catch(e)
	{
		fail("Should not reach here");
	}
});