async function loadAPISettings(jsonPath = "api_settings.json")
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

export default loadAPISettings;