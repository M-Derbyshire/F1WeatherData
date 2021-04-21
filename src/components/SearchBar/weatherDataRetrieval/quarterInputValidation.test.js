import isQuarterValid from './quarterInputValidation';

test("isQuarterValid will return true if given a valid quarter", () => {
	
	expect(isQuarterValid(1)).toBeTruthy();
	expect(isQuarterValid(2)).toBeTruthy();
	expect(isQuarterValid(3)).toBeTruthy();
	expect(isQuarterValid(4)).toBeTruthy();
	
});

test("isQuarterValid will return false if given a non-numeric value", () => {
	
	expect(isQuarterValid("test")).toBeFalsy();
	expect(isQuarterValid(false)).toBeFalsy();
	
});

test("isQuarterValid will return false if given a non-integer value", () => {
	
	expect(isQuarterValid(1.7)).toBeFalsy();
	expect(isQuarterValid(0.2)).toBeFalsy();
	expect(isQuarterValid(3.14)).toBeFalsy();
	
});

test("isQuarterValid will return false if given a value beneath 1", () => {
	
	expect(isQuarterValid(0)).toBeFalsy();
	expect(isQuarterValid(-1)).toBeFalsy();
	expect(isQuarterValid(-2)).toBeFalsy();
	
});

test("isQuarterValid will return false if given a value above 4", () => {
	
	expect(isQuarterValid(5)).toBeFalsy();
	expect(isQuarterValid(6)).toBeFalsy();
	expect(isQuarterValid(7)).toBeFalsy();
	
});