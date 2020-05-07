import validateYearInput from './yearInputValidation';

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