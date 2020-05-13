export default async function retrieveF1DataObject(year)
{
    try
    {
        let response = await fetch(`http://ergast.com/api/f1/${year}/races.json`);
        
        if(response.ok)
        {
            let allF1Data = await response.json();
    
            //Don't need all data, just certain elements
            let requiredF1Data = allF1Data.MRData.RaceTable.Races.map((race) => {
                return {
                    year: year,
                    circuitId: race.Circuit.circuitId,
                    circuitName: race.Circuit.circuitName,
                    raceName: race.raceName,
                    round: race.round,
                    locality: race.Circuit.Location.locality,
                    country: race.Circuit.Location.country,
                    lat: race.Circuit.Location.lat,
                    long: race.Circuit.Location.long,
                    raceDate: race.date,
                    raceTime: race.time //Returned as UTC, so has 'Z' suffix
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