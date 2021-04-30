import getAuthJWT from './getAuthJWT';


test("getAuthJWT will return the token if the response is valid (meaning the login was successful)", async () => {
	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve({ jwt: "token" })
		})
	);
	
	const result = await getAuthJWT("test", "test", "/");
	
	expect(result).toBe("token");
});

test("getAuthJWT will throw an error if it recieves a 403 status, and the message will say that the login details were incorrect", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			status: 403
		})
	);
	
	try
	{
		await getAuthJWT("test", "test", "/");
	}
	catch(e)
	{
		expect(e.message).toBe("The provided login details are not correct.");
	}
});

test("getAuthJWT will throw an error if it receives a bad status (not a 403)", async () => {

	
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			status: 404
		})
	);
	
	try
	{
		await getAuthJWT("test", "test", "/");
		fail("Should not reach here");
	}
	catch(e)
	{
		expect(e.message).toBe("There was an issue while attempting to log in. Please try again later.");
	}
});

test("getAuthJWT will throw an error if there is a problem with the API", async () => {
	
	global.fetch = jest.fn(() => Promise.reject("API is down"));
	
	try
	{
		await getAuthJWT("test", "test", "/");
	}
	catch(e)
	{
		expect(e.message).toBe("There was an issue while attempting to log in. Please try again later.");
	}
});