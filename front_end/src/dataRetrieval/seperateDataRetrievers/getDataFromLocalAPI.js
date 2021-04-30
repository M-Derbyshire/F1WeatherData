//This will retrieve the data from the local API.
//This takes 3 parameters: the year, quarter, and the base of the API's URL.
//This may throw an error.
export default async function getDataFromLocalAPI(year, quarter, apiBaseURL)
{
	//Check the base URL is not null, and then build the full request URL
	if(!apiBaseURL) 
	{
		throw new Error("Cannot retrieve data from local API, as no address for the API has been provided.");
	}
	if(!apiBaseURL || !apiBaseURL.endsWith("/")) apiBaseURL += "/";
	const apiURL = `${apiBaseURL}rounds/${year}/${quarter}`;
	
	
	//Make the request, and throw any errors
	try
	{
		let response = await fetch(apiURL);
		
		if(!response.ok)
		{
			throw new Error("The server returned a bad response to the GET request.");
		}
		else
		{
			//Finally, transform the data to match the data from the 3rd party APIs, and return it
			const responseBody = await response.json();
			return responseBody.map(mapLocalAPIObjectTo3rdPartyFormat);
		}
	}
	catch(err)
	{
		throw new Error("Error connecting to local API - " + err.message);
	}
}


export function mapLocalAPIObjectTo3rdPartyFormat(data)
{
	const raceYear = new Date(data.raceDate).getFullYear().toString();
	
	let newData = {
		year: raceYear,	
		quarter: data.quarter,
		raceDate: data.raceDate,
		raceName: data.raceName,
		raceTime: data.raceTime + "Z",
		round: data.round,
		circuitId: data.circuit.circuitId,
		circuitName: data.circuit.circuitName,
		lat: data.circuit.lat,
		locality: data.circuit.locality,
		long: data.circuit.lon,
		country: data.circuit.country.name,
		stationID: (data.weather && data.weather.stationID) ? data.weather.stationID : null,
		weather: (data.weather) ? data.weather : {}
	};
	
	delete newData.weather.stationID;
	
	return newData;
}