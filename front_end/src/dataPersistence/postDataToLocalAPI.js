
//Takes 2 parameters: data (an array of data objects compiled by the app from 
//the 3rd party APIs) and authHeader (the Authentication header for the POST request).
//This will throw an exception if there is an issue connecting to the API
export default async function postDataToLocalAPI(data, authHeader, apiBaseURL)
{
	if(!apiBaseURL.endsWith("/")) apiBaseURL += "/";
	const apiURL = apiBaseURL + "rounds";
	
	const newData = data.map((d) => {
		return map3rdPartyDataToLocalAPIObject(d);
	});
	
	try
	{
		let response = await fetch(apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData)
		});
		
		if(!response.ok)
		{
			throw new Error("The server returned a bad response to the POST request.");
		}
	}
	catch(err)
	{
		throw new Error("Error connecting to local API - " + err.message);
	}
}

//Takes one argument: data (a single object from the above function), and
//returns an object that matches theformat required for the local API to accept
export function map3rdPartyDataToLocalAPIObject(data)
{
	let newData = {
		quarter: data.quarter,
		raceDate: data.raceDate,
		raceName: data.raceName,
		raceTime: data.raceTime,
		round: data.round,
		circuit: {
			circuitId: data.circuitId,
			circuitName: data.circuitName,
			lat: data.lat,
			locality: data.locality,
			lon: data.long,
			country: {
				name: data.country
			}
		},
		weather: null //We will populate this next, if it's not an empty object (otherwise, leave as null)
	};
	
	if(Object.keys(data.weather).length > 0)
	{
		newData.weather = data.weather;
		newData.weather.stationID = data.stationID;
	}
	
	
	return newData;
}