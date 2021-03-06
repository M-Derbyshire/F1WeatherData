import getAPISettings, { loadAPISettings } from './getAPISettings';

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