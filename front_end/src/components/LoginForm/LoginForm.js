import React, { useState } from 'react';
import './LoginForm.css';
import getAPISettings from '../../dataRetrieval/seperateDataRetrievers/getAPISettings';
import getAuthJWT from '../../authentication/getAuthJWT';

export default function LoginForm(props)
{
	let [apiSettings, setApiSettings] = props.apiSettingsState;
	
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);
	
	const loginHandler = async (e) => {
		
		e.preventDefault();
		
		const username = document.getElementById("emailAddressInput").value;
		const passwordInput = document.getElementById("passwordInput");
		const password = passwordInput.value;
		
		try
		{
			//This function does the check to see if we already have them loaded
			const currentApiSettings = await getAPISettings(apiSettings);
			setApiSettings(currentApiSettings);
			
			if(!currentApiSettings.hasOwnProperty("local_api_base_address"))
			{
				setLoginErrorMessage("Sorry, but the contributers system is not currently available.");
				return;
			}
			
			try
			{
				currentApiSettings.authHeader = "Bearer " + await getAuthJWT(username, password, currentApiSettings.local_api_base_address);
				
				setApiSettings(currentApiSettings);
				setLoginErrorMessage(false);
			}
			catch(err)
			{
				//This may say that the login details were incorrect, or it may say it was a connection issue.
				setLoginErrorMessage(err.message);
			}
			
		}
		catch(err)
		{
			setLoginErrorMessage("Sorry, but their was an error while connecting to the contributers system. Please try again later.");
		}
		
		passwordInput.value = "";
		
	}
	
	return (
		<div className="LoginForm">
			
			<h1>Contributer Login</h1>
			{loginErrorMessage && <p className="loginError">{loginErrorMessage}</p>}
			<form onSubmit={loginHandler}>
				<div className="inputArea">
					<label htmlFor="username">Email Address:</label>
					<input type="email" id="emailAddressInput" name="username" />
				</div>
				<div className="inputArea">
					<label htmlFor="password">Password:</label>
					<input type="password" id="passwordInput" name="password" />
				</div>
				
				<input type="submit" value="Log In" />
			</form>
			
		</div>
	);
}