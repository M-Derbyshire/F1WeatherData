import loadAPISettings from './loadAPISettings';

const validJSON = JSON.stringify({ testProp: "testing" });
const badJSON = "{ badJSONhere }";

test("loadAPISettings will return the data object for valid JSON", async () => {
    
    fetch.resetMocks();
    
    fetch.mockResponseOnce(validJSON);
    
    const result = await loadAPISettings();
    expect(result.hasOwnProperty("testProp")).toBeTruthy();
    expect(result.testProp).toBe("testing");
});

test("loadAPISettings will throw an exception if recieving bad JSON", async () => {
    fetch.resetMocks();
    
    fetch.mockResponseOnce(badJSON);
    
    await expect(loadAPISettings()).rejects.toThrow();
});

test("loadAPISettings will throw an error if it cannot get a response", async () => {
    fetch.disableMocks();
    
    await expect(loadAPISettings("http://non-existant-site/api")).rejects.toThrow();
});