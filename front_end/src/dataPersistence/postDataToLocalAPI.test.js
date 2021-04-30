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
	raceTime: "test",
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

test("map3rdPartyDataToLocalAPIObject will not change a non-empty weather object", () => {
	
	const weather = { ...example3rdPartyDataStructure.weather };
	
	const result = map3rdPartyDataToLocalAPIObject(example3rdPartyDataStructure);
	
	expect(result.weather).toEqual(weather);
});