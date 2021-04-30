import getDataFromLocalAPI, { mapLocalAPIObjectTo3rdPartyFormat } from './getDataFromLocalAPI';

const exampleLocalDataStructure = {
	quarter: 1,
	raceDate: "2021-04-30",
	raceName: "test",
	raceTime: "00:00:00",
	round: 1,
	circuit: {
		circuitId: "test",
		circuitName: "test",
		lat: "test",
		locality: "test",
		lon: "test",
		country: {
			name: "test"
		}
	},
	weather: {
		stationID: "test",
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



test("mapLocalAPIObjectTo3rdPartyFormat will set the weather property to an empty object if it's null", () => {
	
	let emptyWeather = { ...exampleLocalDataStructure };
	emptyWeather.weather = null;
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(emptyWeather);
	
	expect(result.weather).toEqual({});
	
});

test("mapLocalAPIObjectTo3rdPartyFormat will take the stationID out of the weather object, and place it in the outer object", () => {
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(exampleLocalDataStructure);
	
	expect(result.hasOwnProperty("stationID")).toBeTruthy();
	expect(result.weather.hasOwnProperty("stationID")).toBeFalsy();
	
});

test("mapLocalAPIObjectTo3rdPartyFormat will place the country name into the outer object", () => {
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(exampleLocalDataStructure);
	
	expect(result.hasOwnProperty("country")).toBeTruthy();
	
});

test("mapLocalAPIObjectTo3rdPartyFormat will place the circuit info in the outer object, and remove the circuit object", () => {
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(exampleLocalDataStructure);
	
	expect(result.hasOwnProperty("circuit")).toBeFalsy();
	
	expect(result.hasOwnProperty("circuitId")).toBeTruthy();
	expect(result.hasOwnProperty("circuitName")).toBeTruthy();
	expect(result.hasOwnProperty("lat")).toBeTruthy();
	expect(result.hasOwnProperty("long")).toBeTruthy();
	expect(result.hasOwnProperty("locality")).toBeTruthy();
	
});

test("mapLocalAPIObjectTo3rdPartyFormat will add the UTC 'Z' to the end of the raceTime", () => {
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(exampleLocalDataStructure);
	
	expect(result.raceTime.slice(-1)).toBe("Z");
	
});

test("mapLocalAPIObjectTo3rdPartyFormat will add the year (as a string) to the result object", () => {
	
	const result = mapLocalAPIObjectTo3rdPartyFormat(exampleLocalDataStructure);
	
	expect(result.year).toEqual("2021");
	
});




test("getDataFromLocalAPI will throw an error if the passed apiBaseURL is null", async () => {
	
	try
	{
		const result = await getDataFromLocalAPI(2020, 1, null);
		fail("Should not reach here");
	}
	catch(err)
	{
		expect(err.message).toBe("Cannot retrieve data from local API, as no address for the API has been provided.");
	}
});

test("getDataFromLocalAPI will throw an error if there is a problem with the API", async () => {
	
	global.fetch = jest.fn(() => Promise.reject("API is down"));
	
	try
	{
		await getDataFromLocalAPI(2020, 1, "/");
		fail("Should not reach here");
	}
	catch(e)
	{
		expect(e.message).toContain("Error connecting to local API - ");
	}
});

test("getDataFromLocalAPI will throw an error if it receives a bad status", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			status: 404
		})
	);
	
	try
	{
		await getDataFromLocalAPI(2020, 1, "/");
		fail("Should not reach here");
	}
	catch(e)
	{
		expect(e.message).toContain("The server returned a bad response to the GET request.");
	}
});

test("getDataFromLocalAPI will not throw an error if it receives a good response, and will return the data", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve([exampleLocalDataStructure])
		})
	);
	
	try
	{
		const result = await getDataFromLocalAPI(2020, 1, "/");
		expect(result[0].hasOwnProperty("quarter")).toBeTruthy();
	}
	catch(e)
	{
		fail("Should not reach here");
	}
});