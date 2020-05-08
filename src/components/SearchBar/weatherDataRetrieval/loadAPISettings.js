export default async function getAPISettings(currentApiSettings, jsonPath = "api_settings.json")
{
    //If the apiSettings haven't yet been loaded, load them.
    //Otherwise, use the state that was passed in.
    if(currentApiSettings === null)
    {
        return await loadAPISettings(jsonPath);
    }
    else
    {
        return currentApiSettings;
    }
}

export async function loadAPISettings(jsonPath)
{
    const response = await fetch(jsonPath);
    
    if(response.ok)
    {
        try
        {
            return await response.json();
        }
        catch(err)
        {
            throw Error("Error while parsing settings data: " + err);
        }
    }
    else
    {
        throw Error("Error while fetching API Settings: " + response.statusText);
    }
}

export function getMissingAPISettings(apiSettings)
{
    const expectedSettingsNames = [
        "meteostat_API_key",
        "oldest_year_available"
    ];
    
    const givenSettingsNames = Object.getOwnPropertyNames(apiSettings);
    let missingSettingsNames = [];
    
    expectedSettingsNames.forEach((setting) => {
        if(!givenSettingsNames.includes(setting)) missingSettingsNames.push(setting);
    });
    
    return missingSettingsNames;
}