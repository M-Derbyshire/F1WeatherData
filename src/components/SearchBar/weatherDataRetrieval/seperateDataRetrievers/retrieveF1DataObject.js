//Takes the year as an input, and can also be given an offset, and a result limit 
// - The resultOffset will tell the API to only provide races after a given round number.
// - The resultLimit will be ignored if set to a negative number. This will limit the amount 
//		of results we recieve.
export default async function retrieveF1DataObject(year, quarter = 1, resultOffset = 0, resultLimit = -1)
{
    try
    {
		let requestURL = `http://ergast.com/api/f1/${year}/races.json?offset=${resultOffset}`;
		if(resultLimit > -1) requestURL += `&limit=${resultLimit}`; 
		
        let response = await fetch(requestURL);
        
        if(response.ok)
        {
            let allF1Data = await response.json();
    
            //Don't need all data, just certain elements
            let requiredF1Data = allF1Data.MRData.RaceTable.Races.map((race) => {
                return {
                    year: year,
					quarter: quarter,
                    circuitId: race.Circuit.circuitId,
                    circuitName: race.Circuit.circuitName,
                    raceName: race.raceName,
                    round: race.round,
                    locality: race.Circuit.Location.locality,
                    country: race.Circuit.Location.country,
                    lat: race.Circuit.Location.lat,
                    long: race.Circuit.Location.long,
                    raceDate: race.date,
                    raceTime: (race.hasOwnProperty("time")) ? race.time : "unknown" //Returned as UTC, so has 'Z' suffix (some old records don't have this)
                };
            });
            
            return requiredF1Data;
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(e)
    {
        throw Error("Error while fetching F1 data: " + e);
    }
}