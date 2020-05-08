import validateYearInput, { displayInvalidYearAlert } from './yearInputValidation';

//validateYearInput()
test("validateYearInput will return 'empty' is passed empty string", () => {
    const emptyResult = validateYearInput("", 2000);
    expect(emptyResult).toBe("empty");
});

test("validateYearInput will return 'badFormat', if given a non-numeric string", () => {
    const nanResult = validateYearInput("2k12", 2000);
    expect(nanResult).toBe("badFormat");
});

test("validateYearInput will return 'badFormat', if given a string over 4 characters", () => {
    const longResult = validateYearInput("20201", 2000);
    expect(longResult).toBe("badFormat");
});

test("validateYearInput will return 'badFormat', if given a string under 4 characters", () => {
    const shortResult = validateYearInput("201", 2000);
    expect(shortResult).toBe("badFormat");
});

test("validateYearInput will return 'old', if given a date that is too old", () => {
    const oldResult = validateYearInput("1000", 2000);
    expect(oldResult).toBe("old");
})

test("validateYearInput will return 'future', if given a date in the future", () => {
    let d = new Date();
    d.setFullYear(d.getFullYear()+1);
    const validResult = validateYearInput(d.getFullYear().toString(), 2000);
    expect(validResult).toBe("future");
})

test("validateYearInput will return 'valid', if given a valid date", () => {
    let d = new Date();
    d.setFullYear(d.getFullYear()-1);
    const validResult = validateYearInput(d.getFullYear().toString(), 2000);
    expect(validResult).toBe("valid");
})



//displayInvalidYearAlert()
window.alert = jest.fn();

test("displayInvalidYearAlert will alert if the given validation result is 'old'", async () => {
    
    const validationResult = "old";
    const yearValue = "1000"
    
    displayInvalidYearAlert(validationResult, yearValue);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is too long ago, and the data is not available.");
});

test("displayInvalidYearAlert will alert if the given validation result is 'future'", async () => {
    
    const validationResult = "future";
    const yearValue = "3000"
    
    displayInvalidYearAlert(validationResult, yearValue);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is in the future.");
});

test("displayInvalidYearAlert will alert if the given validation result is 'badFormat'", async () => {
    
    const validationResult = "badFormat";
    const yearValue = "2k20";
    
    displayInvalidYearAlert(validationResult, yearValue);
    
    expect(window.alert).toHaveBeenCalledWith("Sorry, " + yearValue + " is not a valid year input. Please use a 4 digit, YYYY format.");
});

test("displayInvalidYearAlert will alert if the given validation result is 'empty'", async () => {
    
    const validationResult = "empty";
    const yearValue = "";
    
    displayInvalidYearAlert(validationResult, yearValue);
    
    expect(window.alert).toHaveBeenCalledWith("Please provide a year to search for.");
});