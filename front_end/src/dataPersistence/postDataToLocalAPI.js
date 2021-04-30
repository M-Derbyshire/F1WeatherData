
//Takes 2 parameters: data (an array of data objects compiled by the app from 
//the 3rd party APIs) and authHeader (the Authentication header for the POST request).
//This will throw an exception if there is an issue connecting to the API
export default async function postDataToLocalAPI(data, authHeader, apiBaseURL)
{
	//If we have no authHeader or apiBaseURL we can't make the request
	if(!authHeader) 
	{
		throw new Error("Cannot POST to local API, as no Authorization header has been provided.");
	}
	if(!apiBaseURL) 
	{
		throw new Error("Cannot POST to local API, as no address for the API has been provided.");
	}
	
	if(!apiBaseURL || !apiBaseURL.endsWith("/")) apiBaseURL += "/";
	const apiURL = apiBaseURL + "rounds";
	
	const newData = data.map(map3rdPartyDataToLocalAPIObject);
	
	try
	{
		let response = await fetch(apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': authHeader
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
		raceTime: (data.raceTime.charAt(data.raceTime.length - 1).toLowerCase() === "z") ? 
											data.raceTime.slice(0, -1) : data.raceTime,
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
		newData.weather = { ...data.weather }; //copying this, so we don't mutate it with the below addition
		newData.weather.stationID = data.stationID;
	}
	
	
	return newData;
}