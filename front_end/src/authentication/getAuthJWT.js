
//This will attempt to retrieve a JWT from the local API.
//It will throw an error if something went wrong, or if the login details were incorrect.
export default async function getAuthJWT(username, password, apiBaseURL)
{
	if(!apiBaseURL.endsWith("/")) apiBaseURL += "/";
	const apiURL = apiBaseURL + "auth";
	
	let response;
	const defaultErrorText = "There was an issue while attempting to log in. Please try again later.";
	
	try
	{
		response = await fetch(apiURL, {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		
	}
	catch(err)
	{
		throw new Error(defaultErrorText);
	}
	
	if(response.ok)
	{
		const responseBody = await response.json();
		return responseBody.jwt;
	}
	else if (response.status === 403)
	{
		throw new Error("The provided login details are not correct.");
	}
	else
	{
		throw new Error(defaultErrorText);
	}
}