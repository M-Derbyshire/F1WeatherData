export default async function getAPISettings(currentApiSettings, jsonPath = "api_settings.json")
{
    //If the apiSettings haven't yet been loaded, load them.
    //Otherwise, use the state that was passed in.
    if(!currentApiSettings)
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
    try
    {
        const response = await fetch(jsonPath);
        
        if(response.ok)
        {
            return await response.json();
        }
        else
        {
            throw Error(response.statusText);
        }
    }
    catch(err)
    {
        throw Error("Error while fetching settings data: " + err.message);
    }
}