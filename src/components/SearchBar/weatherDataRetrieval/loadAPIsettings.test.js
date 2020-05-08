import getAPISettings, { loadAPISettings, getMissingAPISettings } from './loadAPISettings';

const validJSON = JSON.stringify({ testProp: "testing" });
const badJSON = "{ badJSONhere }";
const settingsPath = "api_settings.json";

test("getAPISettings will load the JSON, if passed a null value for the current settings", async () => {
    
    fetch.resetMocks();
    
    fetch.mockResponseOnce(validJSON);
    
    const result = await getAPISettings(null, settingsPath);
    expect(result.hasOwnProperty("testProp")).toBeTruthy();
    expect(result.testProp).toBe("testing");
});

test("getAPISettings will return the passed settings, if passed a settings object, rather than null", async () => {
    
    fetch.resetMocks();
    
    fetch.mockResponseOnce(validJSON); //If this is returned, the test has failed
    const currentSettings = { loadedProp: "loadedTest" }; //If this is returned, the test has passed
    
    const result = await getAPISettings(currentSettings, settingsPath);
    expect(result.hasOwnProperty("loadedProp")).toBeTruthy();
    expect(result.loadedProp).toBe("loadedTest");
});

test("loadAPISettings will throw an exception if recieving bad JSON", async () => {
    fetch.resetMocks();
    
    fetch.mockResponseOnce(badJSON);
    
    await expect(loadAPISettings(settingsPath)).rejects.toThrow();
});

test("loadAPISettings will throw an error if it cannot get a response", async () => {
    fetch.disableMocks();
    
    await expect(loadAPISettings("http://non-existant-site/api")).rejects.toThrow();
});

test("getMissingAPISettings will return a list of settings that are missing from the settings object", () => {
    const emptySettings = {};
    const settingsMissing = { meteostat_API_key: "000000"};
    
    const emptyResults = getMissingAPISettings(emptySettings);
    const missingResults = getMissingAPISettings(settingsMissing);
    
    expect(emptyResults.length).toBeGreaterThan(1);
    expect(missingResults.length).toBeGreaterThan(0);
});